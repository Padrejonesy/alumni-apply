import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// ============================================================
// TQS: TUTOR QUALITY SCORE (0-100)
// Opendoor-style composite algorithm using all available signals
// ============================================================

const IVY_PLUS = ['Harvard University', 'Yale University', 'Princeton University', 'Stanford University', 'Massachusetts Institute of Technology', 'MIT', 'Columbia University', 'University of Pennsylvania', 'Dartmouth College', 'Brown University', 'Cornell University', 'Duke University', 'University of Chicago', 'Caltech', 'California Institute of Technology'];
const TOP_20 = ['Northwestern University', 'Johns Hopkins University', 'Rice University', 'Vanderbilt University', 'Washington University in St. Louis', 'Georgetown University', 'Emory University', 'UCLA', 'University of California, Berkeley', 'University of Notre Dame', 'University of Michigan', 'University of Virginia', 'Carnegie Mellon University', 'Georgia Tech', 'New York University'];
const TOP_50 = ['Boston College', 'Boston University', 'Tufts University', 'Wake Forest University', 'University of North Carolina', 'University of Florida', 'University of Wisconsin', 'Ohio State University', 'Penn State University', 'University of Texas', 'University of Southern California', 'Villanova University', 'University of Richmond', 'Bowdoin College', 'Amherst College', 'Williams College', 'Claremont McKenna College', 'Pomona College', 'Middlebury College', 'Colby College', 'Bates College', 'University of Connecticut', 'Indiana University', 'Washington & Lee University'];

const HIGH_DEMAND_SUBJECTS = ['Mathematics', 'Science', 'SAT Prep', 'ACT Prep', 'Computer Science', 'English', 'Physics', 'Chemistry', 'Biology', 'Calculus'];

function computeTQS(app: any, evalScores: any): { tqs: number; breakdown: any } {
  // === ACADEMIC CREDENTIALS (30 pts) ===
  let satPts = 0;
  if (app.sat_score) {
    if (app.sat_score >= 1580) satPts = 10;
    else if (app.sat_score >= 1550) satPts = 9;
    else if (app.sat_score >= 1500) satPts = 8;
    else if (app.sat_score >= 1450) satPts = 7;
    else if (app.sat_score >= 1400) satPts = 6;
    else if (app.sat_score >= 1350) satPts = 5;
    else if (app.sat_score >= 1300) satPts = 4;
    else satPts = 3;
  }

  let actPts = 0;
  if (app.act_score) {
    if (app.act_score >= 36) actPts = 10;
    else if (app.act_score >= 35) actPts = 9;
    else if (app.act_score >= 34) actPts = 8;
    else if (app.act_score >= 33) actPts = 7;
    else if (app.act_score >= 32) actPts = 6;
    else if (app.act_score >= 30) actPts = 5;
    else actPts = 3;
  }
  // Use best of SAT or ACT
  const testPts = Math.max(satPts, actPts);

  let apPts = 0;
  const apCount = app.ap_scores?.length || app.ap_fives_count || 0;
  apPts = Math.min(5, Math.round(apCount * 0.5));

  let collegePts = 0;
  const college = (app.college || '').trim();
  if (IVY_PLUS.some(s => college.toLowerCase().includes(s.toLowerCase()))) collegePts = 5;
  else if (TOP_20.some(s => college.toLowerCase().includes(s.toLowerCase()))) collegePts = 4;
  else if (TOP_50.some(s => college.toLowerCase().includes(s.toLowerCase()))) collegePts = 3;
  else collegePts = 1;

  let gpaPts = 0;
  if (app.college_gpa) {
    if (app.college_gpa >= 3.9) gpaPts = 5;
    else if (app.college_gpa >= 3.7) gpaPts = 4;
    else if (app.college_gpa >= 3.5) gpaPts = 3;
    else if (app.college_gpa >= 3.0) gpaPts = 2;
    else gpaPts = 1;
  }

  const academicRaw = testPts + apPts + collegePts + gpaPts; // max 25
  const academicScore = (academicRaw / 25) * 30;

  // === TEACHING DEMO (40 pts) ===
  const clarity = evalScores?.clarity?.score || 0;
  const patience = evalScores?.patience?.score || 0;
  const knowledge = evalScores?.knowledge?.score || 0;
  const engagement = evalScores?.engagement?.score || 0;
  const communication = evalScores?.communication?.score || 0;
  const accuracy = evalScores?.accuracy?.score || 0;
  const demoRaw = clarity + patience + knowledge + engagement + communication + accuracy; // max 60
  const demoScore = (demoRaw / 60) * 40;

  // === PROFILE COMPLETENESS (10 pts) ===
  let profilePts = 0;
  if (app.headshot_url) profilePts += 2;
  if (app.resume_url) profilePts += 2;
  if (app.bio && app.bio.trim().length > 50) profilePts += 2;
  if (app.linkedin_url) profilePts += 2;
  if (app.reference_name && app.reference_email) profilePts += 2;
  const profileScore = profilePts; // max 10

  // === AVAILABILITY (10 pts) ===
  let availPts = 0;
  const schedSlots = app.availability_schedule;
  if (schedSlots) {
    const slotStr = typeof schedSlots === 'string' ? schedSlots : '';
    const slotCount = slotStr.split(',').filter((s: string) => s.trim()).length;
    const weeklyHours = slotCount * 0.5;
    if (weeklyHours >= 20) availPts += 5;
    else if (weeklyHours >= 10) availPts += 3;
    else if (weeklyHours >= 5) availPts += 2;
    else availPts += 1;

    // Peak hours: check for weekday afternoon slots (15:00-20:00)
    const peakDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    let peakCount = 0;
    for (const day of peakDays) {
      if (slotStr.includes(`${day}-15:`) || slotStr.includes(`${day}-16:`) || slotStr.includes(`${day}-17:`) || slotStr.includes(`${day}-18:`) || slotStr.includes(`${day}-19:`)) {
        peakCount++;
      }
    }
    availPts += Math.min(5, peakCount);
  }
  const availScore = Math.min(10, availPts);

  // === SUBJECT DEMAND FIT (10 pts) ===
  let demandPts = 0;
  const subjects = app.preferred_subjects || app.subjects || [];
  for (const subj of subjects) {
    if (HIGH_DEMAND_SUBJECTS.some(hd => subj.toLowerCase().includes(hd.toLowerCase()))) {
      demandPts++;
    }
  }
  demandPts = Math.min(5, demandPts);

  // Market match
  const activeMarkets = ['Greenwich High School', 'Greenwich Academy', 'Brunswick School', 'Staples High School', 'Darien High School', 'New Canaan High School', 'Ridgefield High School', 'Fox Lane High School', 'Hackley School', 'Rye Country Day School', "St. Mark's School of Texas", 'Greenwich Country Day School', 'Fairfield Preparatory School'];
  const hs = (app.high_school || '').trim();
  let marketPts = 1;
  if (activeMarkets.some(m => m.toLowerCase() === hs.toLowerCase())) marketPts = 5;
  else if (hs) marketPts = 3;

  const demandScore = Math.min(10, demandPts + marketPts);

  // === TOTAL TQS ===
  const tqs = Math.round((academicScore + demoScore + profileScore + availScore + demandScore) * 10) / 10;

  return {
    tqs: Math.min(100, Math.max(0, tqs)),
    breakdown: {
      academic: { score: Math.round(academicScore * 10) / 10, max: 30, test: testPts, ap: apPts, college: collegePts, gpa: gpaPts },
      teaching_demo: { score: Math.round(demoScore * 10) / 10, max: 40, clarity, patience, knowledge, engagement, communication, accuracy },
      profile: { score: profileScore, max: 10 },
      availability: { score: availScore, max: 10 },
      demand_fit: { score: demandScore, max: 10, subjects: demandPts, market: marketPts },
    },
  };
}

// ============================================================
// EVALUATION PROMPT
// ============================================================

const EVAL_PROMPT = `You are a strict evaluator for Alumni Tutoring, a premium tutoring company. You have HIGH standards. These tutors work with paying families and their children.

You are evaluating a tutor applicant's teaching demo transcript. They were asked to teach an AP-level topic for 5-10 minutes as if explaining to a confused high school student.

STEP 1 - MANDATORY SAFETY & QUALITY GATE:
Reject the submission immediately (all scores = 1, recommendation = \"rejected\") if ANY of these are true:
- Contains ANY profanity, slurs, hate speech, discriminatory language, or inappropriate content
- Is not actually teaching anything (rambling, off-topic, nonsensical)
- Is extremely short (less than ~1 minute of real teaching content)
- Shows no genuine effort to explain a concept
- Is clearly trolling, spam, or a bad-faith submission
- Contains content that would be inappropriate in a tutoring setting with minors

If rejected for safety/quality, set safety_passed to false and explain in safety_reason.

STEP 2 - STRICT EVALUATION (only if Step 1 passes):
Be a tough but fair grader. Most applicants should score 5-7. Reserve 8+ for genuinely exceptional teaching.

Score each criterion 1-10:

1. **Clarity** - Did they ACTUALLY explain the concept in a way a confused student would understand? Using jargon without explaining it = low score. Vague hand-waving = low score. Clear analogies and step-by-step breakdowns = high score.

2. **Patience** - Did they go slow enough? Did they check for understanding? Did they rephrase when something might be confusing? Rushing through = low score.

3. **Knowledge** - Do they demonstrate DEEP understanding? Can they explain WHY, not just WHAT? Textbook regurgitation = 5. Real insight and multiple angles = 8+.

4. **Engagement** - Would a student actually want to learn from this person? Monotone reading = low score. Genuine enthusiasm and relatable examples = high score.

5. **Communication** - Is their speech clear, well-organized, and professional? Disorganized jumping between ideas = low score. Logical flow = high score.

6. **Accuracy** - Is the content FACTUALLY CORRECT? This is critical. Check every formula, definition, date, concept, and claim they make. A single major factual error (wrong formula, incorrect definition, false historical claim) = score CAPPED at 3. Multiple factual errors = score of 1 and recommendation must be \"rejected\". Minor imprecisions (slight oversimplifications that are pedagogically acceptable) are okay. But confidently stating wrong information is disqualifying \u2014 these tutors teach real students.

Scoring calibration:
- 9-10: Top 5% - you'd hire them on the spot, exceptional teacher
- 7-8: Strong - clearly knows how to teach, minor areas to improve
- 5-6: Average - has potential but significant weaknesses
- 3-4: Below average - not ready to tutor paying students
- 1-2: Poor or failed safety check

IMPORTANT: If accuracy score is 3 or below, the overall recommendation MUST be \"rejected\" regardless of other scores. We cannot have tutors teaching students wrong information.

Do NOT be generous. A score of 7+ should mean you'd genuinely trust this person to tutor your own child.

Respond ONLY with valid JSON:
{\n  \"safety_passed\": <true|false>,\n  \"safety_reason\": \"<if failed, explain. if passed, 'clean'>\",\n  \"clarity\": { \"score\": <1-10>, \"justification\": \"<2-3 sentences>\" },\n  \"patience\": { \"score\": <1-10>, \"justification\": \"<2-3 sentences>\" },\n  \"knowledge\": { \"score\": <1-10>, \"justification\": \"<2-3 sentences>\" },\n  \"engagement\": { \"score\": <1-10>, \"justification\": \"<2-3 sentences>\" },\n  \"communication\": { \"score\": <1-10>, \"justification\": \"<2-3 sentences>\" },\n  \"accuracy\": { \"score\": <1-10>, \"justification\": \"<2-3 sentences listing any factual errors found, or confirming content was accurate>\" },\n  \"overall_notes\": \"<1-2 paragraph honest assessment>\",\n  \"recommendation\": \"<approved|flagged|rejected>\"\n}`;

// ============================================================
// HELPERS
// ============================================================

function deriveSubjectsFromAP(apScores: string[]): string[] {
  if (!apScores || apScores.length === 0) return ['General Tutoring'];
  const subjectSet = new Set<string>();
  for (const ap of apScores) {
    const a = ap.toLowerCase();
    if (a.includes('calculus') || a.includes('statistics') || a.includes('precalculus')) subjectSet.add('Mathematics');
    if (a.includes('biology') || a.includes('chemistry') || a.includes('physics') || a.includes('environmental')) subjectSet.add('Science');
    if (a.includes('english') || a.includes('literature') || a.includes('language and composition')) subjectSet.add('English');
    if (a.includes('history') || a.includes('government') || a.includes('politics') || a.includes('economics') || a.includes('psychology')) subjectSet.add('History');
    if (a.includes('spanish') || a.includes('french') || a.includes('latin') || a.includes('chinese') || a.includes('japanese') || a.includes('german') || a.includes('italian')) subjectSet.add('Languages');
    if (a.includes('computer science')) subjectSet.add('Computer Science');
  }
  const subjects = Array.from(subjectSet);
  return subjects.length > 0 ? subjects : ['General Tutoring'];
}

function generateSlug(firstName: string, university: string): string {
  const cleanFirst = (firstName || 'tutor').toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanUni = (university || 'university').toLowerCase()
    .replace(/university of /i, '').replace(/ university/i, '').replace(/ college/i, '')
    .replace(/[^a-z0-9]/g, '').substring(0, 20);
  return `${cleanFirst}-${cleanUni}`;
}

const BLOCKED_PATTERNS = [
  /\bn[i1!|]gg[ae3]r?s?\b/i, /\bf[au@]gg?[o0]t/i, /\bk[i1]ke/i, /\bsp[i1]c[k]?s?\b/i,
  /\bch[i1]nk/i, /\bw[e3]tb[a@]ck/i, /\br[e3]t[a@]rd/i, /\btr[a@]nn[yi]/i,
  /\bcunt/i, /\bfuck/i, /\bshit/i, /\bass\s*hole/i, /\bbitch/i,
];

function containsBlockedContent(text: string): string | null {
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(text)) return 'Transcript contains hate speech, slurs, or inappropriate language.';
  }
  return null;
}

// ============================================================
// MAIN HANDLER
// ============================================================

Deno.serve(async (req: Request) => {
  const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization" };
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });

  try {
    const { application_id, video_paths: directPaths } = await req.json();
    if (!application_id) return new Response(JSON.stringify({ error: "application_id required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!GROQ_API_KEY || !ANTHROPIC_API_KEY) return new Response(JSON.stringify({ error: "Missing API keys" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Idempotency check
    const { data: existingEval } = await supabase.from("ai_interviews").select("id").eq("application_id", application_id).limit(1);
    if (existingEval && existingEval.length > 0) return new Response(JSON.stringify({ error: "Already evaluated", interview_id: existingEval[0].id }), { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { data: app, error: fetchErr } = await supabase
      .from("tutor_applications")
      .select("*")
      .eq("id", application_id)
      .single();

    if (fetchErr || !app) return new Response(JSON.stringify({ error: "Application not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Use video paths from DB, or fallback to paths passed directly from frontend
    const videoUrl = app.teaching_video_url || (directPaths ? directPaths.join(',') : null);
    if (!videoUrl) return new Response(JSON.stringify({ error: "No teaching video uploaded" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Save video URL if it came from frontend fallback
    if (!app.teaching_video_url && videoUrl) {
      await supabase.from("tutor_applications").update({ teaching_video_url: videoUrl }).eq("id", application_id);
    }

    // Download and transcribe video(s) — supports comma-separated paths from multi-demo uploads
    const videoPaths = videoUrl.split(',').map((p: string) => p.trim()).filter(Boolean);
    const fileExt = videoUrl.includes('.mp4') ? 'mp4' : 'webm';
    let transcript = '';

    for (let vi = 0; vi < videoPaths.length; vi++) {
      const videoPath = videoPaths[vi];
      let videoBlob: Blob;
      if (videoPath.startsWith('http')) {
        const r = await fetch(videoPath);
        if (!r.ok) continue;
        videoBlob = await r.blob();
      } else {
        const { data: vd, error: dlErr } = await supabase.storage.from("session-files").download(videoPath);
        if (dlErr || !vd) continue;
        videoBlob = vd;
      }

      const tf = new FormData();
      tf.append("file", videoBlob, `demo-${vi + 1}.${fileExt}`);
      tf.append("model", "whisper-large-v3-turbo");
      tf.append("response_format", "text");
      tf.append("language", "en");
      const gr = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", { method: "POST", headers: { "Authorization": `Bearer ${GROQ_API_KEY}` }, body: tf });
      if (gr.ok) {
        const segmentTranscript = await gr.text();
        if (segmentTranscript?.trim()) {
          transcript += (vi > 0 ? `\n\n--- Teaching Demo ${vi + 1} ---\n\n` : '') + segmentTranscript;
        }
      }
    }

    if (!transcript || transcript.trim().length < 50) return new Response(JSON.stringify({ error: "Transcript too short — could not transcribe the video" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Blocklist check
    const blockedReason = containsBlockedContent(transcript);
    if (blockedReason) {
      const failScores = { clarity: { score: 1 }, patience: { score: 1 }, knowledge: { score: 1 }, engagement: { score: 1 }, communication: { score: 1 }, accuracy: { score: 1 } };
      const { tqs, breakdown } = computeTQS(app, failScores);
      await supabase.from("ai_interviews").insert({ candidate_id: null, application_id, transcript: [{ role: "candidate", content: "[REDACTED]" }], scores: failScores, average_score: 1.0, decision: "rejected", evaluator_notes: `Auto-rejected: ${blockedReason}`, conducted_at: new Date().toISOString(), evaluated_at: new Date().toISOString() });
      await supabase.from("tutor_applications").update({ status: "rejected", tqs_score: tqs }).eq("id", application_id);
      return new Response(JSON.stringify({ success: true, application_id, decision: "rejected", average_score: 1.0, tqs, tqs_breakdown: breakdown, reason: blockedReason }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Claude evaluation
    const apSubjects = app.ap_scores?.length > 0 ? app.ap_scores.join(", ") : "various AP subjects";
    const cr = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, messages: [{ role: "user", content: `${EVAL_PROMPT}\n\nCandidate: ${app.first_name} ${app.last_name}\nAP Subjects: ${apSubjects}\n\n--- TRANSCRIPT ---\n${transcript}\n--- END TRANSCRIPT ---` }] }),
    });
    if (!cr.ok) { const e = await cr.text(); return new Response(JSON.stringify({ error: "Evaluation failed", details: e }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
    const cd = await cr.json();
    const evalText = cd.content?.[0]?.text || "";

    let evaluation;
    try { const m = evalText.match(/\{[\s\S]*\}/); evaluation = JSON.parse(m ? m[0] : evalText); }
    catch { return new Response(JSON.stringify({ error: "Failed to parse evaluation", raw: evalText }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }

    if (evaluation.safety_passed === false) {
      for (const k of ['clarity','patience','knowledge','engagement','communication','accuracy']) evaluation[k] = { score: 1, justification: "Failed safety check." };
      evaluation.recommendation = "rejected";
    }

    const scores = [evaluation.clarity?.score||0, evaluation.patience?.score||0, evaluation.knowledge?.score||0, evaluation.engagement?.score||0, evaluation.communication?.score||0, evaluation.accuracy?.score||0];
    const avgScore = scores.reduce((a:number,b:number) => a+b, 0) / scores.length;
    const accuracyScore = evaluation.accuracy?.score || 0;

    // Compute TQS
    const { tqs, breakdown } = computeTQS(app, evaluation);

    // Decision based on TQS thresholds
    let decision: string;
    if (evaluation.safety_passed === false) decision = "rejected";
    else if (accuracyScore <= 3) decision = "rejected";
    else if (tqs >= 65) decision = "approved";
    else if (tqs >= 50) decision = "flagged";
    else decision = "rejected";

    if (evaluation.recommendation === "rejected") decision = "rejected";
    if (evaluation.recommendation === "flagged" && decision === "approved") decision = "flagged";

    // Save evaluation
    await supabase.from("ai_interviews").insert({
      candidate_id: null, application_id,
      transcript: [{ role: "candidate", content: evaluation.safety_passed === false ? "[REDACTED]" : transcript }],
      scores: { clarity: evaluation.clarity, patience: evaluation.patience, knowledge: evaluation.knowledge, engagement: evaluation.engagement, communication: evaluation.communication, accuracy: evaluation.accuracy, tqs_breakdown: breakdown },
      average_score: Math.round(avgScore * 10) / 10, decision,
      evaluator_notes: evaluation.overall_notes || (evaluation.safety_reason || ""),
      conducted_at: new Date().toISOString(), evaluated_at: new Date().toISOString(),
    });

    // Update application
    const newStatus = decision === "approved" ? "approved" : decision === "flagged" ? "pending" : "rejected";
    await supabase.from("tutor_applications").update({ status: newStatus, tqs_score: tqs }).eq("id", application_id);

    // Auto-onboard if approved
    if (decision === "approved") {
      try {
        const subjects = deriveSubjectsFromAP(app.ap_scores || []);
        let slug = generateSlug(app.first_name, app.college);
        const { data: existing } = await supabase.from("public_tutors").select("id").eq("application_id", application_id);
        if (existing && existing.length > 0) {
          await supabase.from("public_tutors").update({ is_active: true, tqs_score: tqs }).eq("application_id", application_id);
        } else {
          const { data: slugCheck } = await supabase.from("public_tutors").select("id").like("id", `${slug}%`);
          if (slugCheck && slugCheck.length > 0) slug = `${slug}-${slugCheck.length + 1}`;
          const tutorBio = app.bio && app.bio.trim().length > 20 ? app.bio : `${app.college || 'University'} student from ${app.high_school || 'a top high school'}. ${app.sat_score ? `SAT: ${app.sat_score}. ` : ''}${app.act_score ? `ACT: ${app.act_score}. ` : ''}${app.ap_scores?.length > 0 ? `Perfect scores on ${app.ap_scores.length} AP exams.` : ''}`;
          await supabase.from("public_tutors").insert({
            id: slug, name: app.first_name, university: app.college || '', high_school: app.high_school || '',
            gender: app.gender || 'Male', subjects, sat_score: app.sat_score || 0, act_score: app.act_score || 0,
            specialties: subjects, availability: 'Flexible Schedule', bio: tutorBio,
            image_url: app.headshot_url || '', ap_scores: app.ap_scores || [],
            is_active: true, sort_order: Math.max(0, 100 - Math.round(tqs)), tqs_score: tqs, application_id: app.id,
          });
        }
      } catch (e) { console.error("Error creating public tutor:", e); }
    }

    return new Response(JSON.stringify({
      success: true, application_id, decision,
      average_score: Math.round(avgScore * 10) / 10,
      tqs, tqs_breakdown: breakdown,
      scores: evaluation, transcript_length: transcript.length,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Unexpected error", details: String(err) }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
});