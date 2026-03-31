import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase-tab-client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Upload, CheckCircle2, Video, Square, Circle, Clock } from "lucide-react";

export function TutorApplicationPage() {
  useEffect(() => {
    document.title = "Apply to Tutor | Alumni Tutoring";
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Apply to become an Alumni Tutoring tutor. Join our team of elite alumni helping students at your former high school succeed.');
  }, []);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [step, setStep] = useState<'form' | 'selectTopics' | 'prep' | 'recording' | 'review' | 'evaluating' | 'done'>('form');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [prepCountdown, setPrepCountdown] = useState(30);
  const [isPreparing, setIsPreparing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const prepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordingMimeTypeRef = useRef<string>('video/webm');

  // Specific prompts per AP subject (all 40 official College Board AP exams)
  const topicPrompts: Record<string, string> = {
    'Art History': "A student is confused about the difference between Baroque and Renaissance art. Explain the key visual and thematic differences using specific examples of famous works.",
    'Biology': "Explain how DNA replication works to a student who keeps confusing it with transcription. Walk them through the steps and help them understand why it's semiconservative.",
    'Calculus AB': "A student is confused about the difference between average rate of change and instantaneous rate of change. Explain derivatives starting from the concept of slope and build up to the limit definition.",
    'Calculus BC': "Explain integration by parts to a student who understands basic integration but can't figure out when and how to apply this technique. Use a clear example.",
    'Chemistry': "A student doesn't understand why some reactions are spontaneous and others aren't. Explain Gibbs free energy, enthalpy, and entropy in a way that clicks.",
    'Chinese Language and Culture': "Explain the four tones in Mandarin Chinese to a student who keeps mixing them up. Use memorable examples and explain why tones change the meaning of words.",
    'Comparative Government and Politics': "Explain the differences between parliamentary and presidential systems to a student preparing for the AP exam. Use specific country examples like the UK, Mexico, and Iran.",
    'Computer Science A': "Explain recursion to a student who understands loops but can't wrap their head around a function calling itself. Use a clear, visual example.",
    'Computer Science Principles': "Explain how the internet works at a high level — packets, routing, protocols — to a student who just thinks 'you type a URL and a page appears.'",
    'English Language and Composition': "Explain how to identify and analyze rhetorical strategies (ethos, pathos, logos) in a persuasive text. Walk through a specific example.",
    'English Literature and Composition': "A student is struggling to write a thesis for a literary analysis essay. Teach them how to move beyond summary and make an interpretive argument.",
    'Environmental Science': "Explain the greenhouse effect and climate change to a student who confuses it with the ozone hole. Help them understand the actual mechanism.",
    'European History': "Explain the causes and consequences of the French Revolution to a student who can't keep the timeline straight.",
    'French Language and Culture': "Explain the French subjunctive mood to a student who doesn't understand when to use it. Start with the concept, then show the triggers and common expressions.",
    'German Language and Culture': "Explain the German case system (nominative, accusative, dative, genitive) to a student who keeps using the wrong articles. Use everyday sentence examples.",
    'Human Geography': "Explain the difference between formal, functional, and vernacular regions to a student who can't tell them apart. Use real-world examples they'd recognize.",
    'Italian Language and Culture': "Explain the passato prossimo vs imperfetto distinction in Italian to a student who keeps using them interchangeably. Give clear rules with conversational examples.",
    'Japanese Language and Culture': "Explain the difference between hiragana, katakana, and kanji to a student just starting Japanese. Help them understand when each writing system is used and why.",
    'Latin': "Explain the ablative case to a student who understands nominative and accusative but gets lost with the other cases. Use clear sentence examples.",
    'Macroeconomics': "A student doesn't understand how the Federal Reserve controls the money supply. Explain monetary policy, open market operations, and how it affects inflation.",
    'Microeconomics': "Explain the concept of elasticity to a student who memorized the formula but can't apply it. Use real examples of elastic vs inelastic goods.",
    'Music Theory': "Explain the circle of fifths to a student who understands basic major scales but can't see the pattern of key signatures. Make it click visually and aurally.",
    'Physics 1': "Explain Newton's Third Law to a student who keeps asking 'if every force has an equal and opposite reaction, why does anything move?' Help them resolve this common misconception.",
    'Physics 2': "A student is struggling with electric fields and can't visualize what's happening. Explain the concept starting from Coulomb's Law and build up to field lines.",
    'Physics C: Electricity and Magnetism': "Explain Gauss's Law to a student who can do the math but doesn't understand what it physically means or when to use it.",
    'Physics C: Mechanics': "Explain rotational dynamics to a student who understands linear F=ma but can't make the jump to torque and angular acceleration.",
    'Precalculus': "A student understands basic algebra but is lost on unit circle trigonometry. Explain sine, cosine, and tangent starting from a right triangle and building to the unit circle.",
    'Psychology': "Explain classical conditioning vs operant conditioning to a student who keeps mixing them up. Use memorable real-world examples for each.",
    'Research': "Explain how to formulate a strong research question to a student who keeps picking topics that are too broad. Walk them through narrowing down and making it arguable.",
    'Seminar': "Explain how to construct a strong evidence-based argument to a student who relies too heavily on personal opinion. Teach them the difference between assertion and analysis.",
    'Spanish Language and Culture': "Explain the difference between preterite and imperfect tense to a student who keeps using them interchangeably. Give clear rules and examples.",
    'Spanish Literature and Culture': "Explain magical realism as a literary movement to a student reading Gabriel Garcia Marquez for the first time. Help them understand why the 'magic' isn't meant to be questioned.",
    'Statistics': "A student keeps confusing Type I and Type II errors. Explain hypothesis testing from scratch, using a real-world example they can relate to.",
    'Studio Art: 2-D Design': "Explain the principles of composition — balance, emphasis, movement — to a student whose artwork feels 'flat.' Use visual examples to show how arrangement creates meaning.",
    'Studio Art: 3-D Design': "Explain how form and space interact in sculpture to a student who only thinks in 2D. Help them understand positive and negative space with hands-on examples.",
    'Studio Art: Drawing': "Explain the concept of value and how to create the illusion of 3D form on a 2D surface. Walk through a shading exercise using a sphere or cube.",
    'United States Government and Politics': "Explain the system of checks and balances to a student who can list the three branches but doesn't understand how they limit each other in practice.",
    'United States History': "Explain the causes of the Civil War to a student who thinks it was 'just about slavery.' Help them understand the political, economic, and social tensions.",
    'World History: Modern': "Explain how the Columbian Exchange transformed both the Old and New Worlds. Help the student see the connections between biology, economics, and culture.",
  };

  const getPromptForTopic = (topic: string): string => {
    return topicPrompts[topic] || `Explain a key concept from ${topic} to a confused high school student. Start with the basics, use analogies, and build up to the more complex ideas. Make it engaging and easy to follow.`;
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    highSchool: "",
    college: "",
    major: "",
    minor: "",
    satMath: "",
    satReading: "",
    satDidNotTake: false,
    actEnglish: "",
    actMath: "",
    actReading: "",
    actScience: "",
    actDidNotTake: false,
    apFivesCount: "",
    graduationYear: "",
    collegeGpa: "",
    availabilitySchedule: [] as string[],
    preferredSubjects: [] as string[],
    referralSource: "",
    referenceName: "",
    referenceEmail: "",
    bio: "",
    linkedinUrl: "",
    priorExperience: "",
    apScores: [] as string[],
    resumeFile: null as File | null,
    headshotFile: null as File | null,
  });

  // Resume existing application on mount
  useEffect(() => {
    const savedAppId = localStorage.getItem('alumni_apply_app_id');
    if (!savedAppId) return;

    (async () => {
      const { data: app } = await supabase
        .from('tutor_applications')
        .select('id, ap_scores, tqs_score, status, teaching_video_url')
        .eq('id', savedAppId)
        .maybeSingle();

      if (!app) {
        localStorage.removeItem('alumni_apply_app_id');
        return;
      }

      // Already fully evaluated
      if (app.tqs_score != null) {
        setSubmitted(true);
        setStep('done');
        setApplicationId(app.id);
        return;
      }

      // Application exists but needs videos — resume at topic selection
      setApplicationId(app.id);
      if (app.ap_scores?.length) {
        setFormData(prev => ({ ...prev, apScores: app.ap_scores }));
      }
      setStep('selectTopics');
    })();
  }, []);

  const maxTopics = Math.min(3, formData.apScores.length);

  const apClassOptions = [
    'Art History', 'Biology', 'Calculus AB', 'Calculus BC',
    'Chemistry', 'Chinese Language and Culture', 'Comparative Government and Politics',
    'Computer Science A', 'Computer Science Principles', 'English Language and Composition',
    'English Literature and Composition', 'Environmental Science', 'European History',
    'French Language and Culture', 'German Language and Culture', 'Human Geography',
    'Italian Language and Culture', 'Japanese Language and Culture', 'Latin',
    'Macroeconomics', 'Microeconomics', 'Music Theory', 'Physics 1', 'Physics 2',
    'Physics C: Electricity and Magnetism', 'Physics C: Mechanics', 'Precalculus',
    'Psychology', 'Research', 'Seminar', 'Spanish Language and Culture',
    'Spanish Literature and Culture', 'Statistics', 'Studio Art: 2-D Design',
    'Studio Art: 3-D Design', 'Studio Art: Drawing',
    'United States Government and Politics', 'United States History', 'World History: Modern',
  ];

  const toggleApScore = (ap: string) => {
    setFormData((prev) => ({
      ...prev,
      apScores: prev.apScores.includes(ap)
        ? prev.apScores.filter((a) => a !== ap)
        : [...prev.apScores, ap],
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({ title: "PDF only", description: "Please upload your resume as a PDF file.", variant: "destructive" });
      e.target.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Resume must be under 5MB.", variant: "destructive" });
      e.target.value = '';
      return;
    }

    // Check page count using PDF header
    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const text = new TextDecoder('latin1').decode(bytes);
      const pageMatches = text.match(/\/Type\s*\/Page[^s]/g);
      const pageCount = pageMatches ? pageMatches.length : 0;
      if (pageCount > 1) {
        toast({ title: "One page only", description: `Your resume is ${pageCount} pages. Please condense it to a single page.`, variant: "destructive" });
        e.target.value = '';
        return;
      }
    } catch {
      // If we can't parse, allow it through
    }

    setFormData((prev) => ({ ...prev, resumeFile: file }));
  };

  const [headshotValidating, setHeadshotValidating] = useState(false);

  const handleHeadshotChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Headshot must be under 5MB.", variant: "destructive" });
      e.target.value = '';
      return;
    }

    // Validate it's a real person's face using AI
    setHeadshotValidating(true);
    try {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
      });

      const mediaType = file.type === 'image/png' ? 'image/png' : file.type === 'image/webp' ? 'image/webp' : 'image/jpeg';

      const res = await fetch("https://xvmsoedgbwokcnlsywom.supabase.co/functions/v1/validate-headshot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ image_base64: base64, media_type: mediaType }),
      });

      const result = await res.json();

      if (!result.valid) {
        toast({
          title: "Invalid headshot",
          description: result.reason || "Please upload a clear photo of your face — this will be used on our website.",
          variant: "destructive",
        });
        e.target.value = '';
        return;
      }

      setFormData((prev) => ({ ...prev, headshotFile: file }));
    } catch (err) {
      // If validation service is down, allow it through
      setFormData((prev) => ({ ...prev, headshotFile: file }));
    } finally {
      setHeadshotValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate SAT: must fill both sections or mark "did not take"
    const satComplete = formData.satDidNotTake || (formData.satMath && formData.satReading);
    const actComplete = formData.actDidNotTake || (formData.actEnglish && formData.actMath && formData.actReading && formData.actScience);
    if (formData.satDidNotTake && formData.actDidNotTake) {
      toast({ title: "Test scores required", description: "You must have taken at least the SAT or ACT to apply.", variant: "destructive" });
      return;
    }
    if (!satComplete || !actComplete) {
      toast({ title: "Please complete test scores", description: "Fill in all sections for each test, or select 'Did not take'.", variant: "destructive" });
      return;
    }
    if (!formData.firstName || !formData.lastName || !formData.gender || !formData.email || !formData.phone || !formData.graduationYear || !formData.highSchool || !formData.college || !formData.major || !formData.referralSource || formData.apScores.length === 0 || formData.preferredSubjects.length === 0 || formData.availabilitySchedule.length === 0) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const bioWordCount = formData.bio.trim().split(/\s+/).filter(Boolean).length;
    if (bioWordCount < 50) {
      toast({ title: "About Yourself is too short", description: `Please write at least 50 words (currently ${bioWordCount}).`, variant: "destructive" });
      return;
    }

    const expWordCount = formData.priorExperience.trim().split(/\s+/).filter(Boolean).length;
    if (expWordCount < 30) {
      toast({ title: "Prior Experience is too short", description: `Please write at least 30 words (currently ${expWordCount}).`, variant: "destructive" });
      return;
    }

    if (formData.linkedinUrl && !formData.linkedinUrl.match(/^https?:\/\/(www\.)?linkedin\.com\//)) {
      toast({ title: "Invalid LinkedIn URL", description: "Please enter a valid LinkedIn profile URL.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      let resumeUrl = null;

      if (formData.resumeFile) {
        const fileExt = formData.resumeFile.name.split(".").pop();
        const fileName = `${Date.now()}-${formData.firstName}-${formData.lastName}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("session-files")
          .upload(`resumes/${fileName}`, formData.resumeFile);

        if (uploadError) throw uploadError;

        resumeUrl = `resumes/${fileName}`;
      }

      let headshotUrl = null;

      if (formData.headshotFile) {
        const fileExt = formData.headshotFile.name.split(".").pop();
        const fileName = `${Date.now()}-${formData.firstName}-${formData.lastName}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("session-files")
          .upload(`headshots/${fileName}`, formData.headshotFile);

        if (uploadError) throw uploadError;

        headshotUrl = `headshots/${fileName}`;
      }

      const appId = crypto.randomUUID();
      const { error } = await supabase.from("tutor_applications").insert({
        id: appId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        email: formData.email,
        phone: formData.phone || null,
        high_school: formData.highSchool || null,
        college: formData.college || null,
        major: formData.major || null,
        minor: formData.minor || null,
        sat_math: formData.satMath ? parseInt(formData.satMath) : null,
        sat_reading: formData.satReading ? parseInt(formData.satReading) : null,
        sat_score: formData.satMath && formData.satReading ? parseInt(formData.satMath) + parseInt(formData.satReading) : null,
        act_english: formData.actEnglish ? parseInt(formData.actEnglish) : null,
        act_math: formData.actMath ? parseInt(formData.actMath) : null,
        act_reading: formData.actReading ? parseInt(formData.actReading) : null,
        act_science: formData.actScience ? parseInt(formData.actScience) : null,
        act_score: formData.actEnglish && formData.actMath && formData.actReading && formData.actScience
          ? Math.round((parseInt(formData.actEnglish) + parseInt(formData.actMath) + parseInt(formData.actReading) + parseInt(formData.actScience)) / 4)
          : null,
        ap_fives_count: formData.apFivesCount ? parseInt(formData.apFivesCount) : null,
        ap_scores: formData.apScores,
        graduation_year: formData.graduationYear ? parseInt(formData.graduationYear) : null,
        college_gpa: formData.collegeGpa ? parseFloat(formData.collegeGpa) : null,
        availability_schedule: formData.availabilitySchedule.length > 0 ? formData.availabilitySchedule.join(', ') : null,
        preferred_subjects: formData.preferredSubjects,
        referral_source: formData.referralSource || null,
        reference_name: formData.referenceName || null,
        reference_email: formData.referenceEmail || null,
        bio: formData.bio || null,
        linkedin_url: formData.linkedinUrl || null,
        prior_experience: formData.priorExperience || null,
        resume_url: resumeUrl,
        headshot_url: headshotUrl,
        subjects: formData.preferredSubjects,
        grade_levels: [],
        status: "pending",
      });

      if (error) throw error;

      setApplicationId(appId);
      localStorage.setItem('alumni_apply_app_id', appId);
      setStep('selectTopics');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      console.error("Error submitting application:", error);
      const msg = error.message || "";
      if (msg.toLowerCase().includes("duplicate") || msg.toLowerCase().includes("unique")) {
        // Try to find and resume the existing application
        const { data: existing } = await supabase
          .from('tutor_applications')
          .select('id, ap_scores, tqs_score')
          .eq('email', formData.email.toLowerCase().trim())
          .maybeSingle();

        if (existing && existing.tqs_score == null) {
          setApplicationId(existing.id);
          localStorage.setItem('alumni_apply_app_id', existing.id);
          if (existing.ap_scores?.length) {
            setFormData(prev => ({ ...prev, apScores: existing.ap_scores }));
          }
          setStep('selectTopics');
          toast({ title: "Welcome back!", description: "We found your application. Let's record your teaching demos." });
          return;
        }

        toast({
          title: "Duplicate Application",
          description: "You already have a completed application. Please contact us at info@alumnitutoring.com",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: msg || "Failed to submit application",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const startPrep = useCallback(() => {
    setIsPreparing(true);
    setPrepCountdown(30);
    // Start camera preview during prep
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        videoRef.current.play();
      }
    }).catch(() => {
      toast({ title: "Camera access required", description: "Please allow camera and microphone access.", variant: "destructive" });
    });
    prepTimerRef.current = setInterval(() => {
      setPrepCountdown(t => {
        if (t <= 1) {
          if (prepTimerRef.current) clearInterval(prepTimerRef.current);
          setIsPreparing(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  const skipPrep = useCallback(() => {
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    setIsPreparing(false);
    setPrepCountdown(0);
  }, []);

  const startRecording = useCallback(async () => {
    try {
      let stream = streamRef.current;
      if (!stream) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      }
      chunksRef.current = [];
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
        ? 'video/webm;codecs=vp9,opus'
        : MediaRecorder.isTypeSupported('video/webm')
          ? 'video/webm'
          : 'video/mp4';
      recordingMimeTypeRef.current = mimeType;
      const recorder = new MediaRecorder(stream, { mimeType });
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setRecordedBlobs(prev => [...prev, blob]);
        // Move to next topic or review
        const nextIndex = currentTopicIndex + 1;
        if (nextIndex < selectedTopics.length) {
          setCurrentTopicIndex(nextIndex);
          setPrepCountdown(30);
          setIsPreparing(true);
          prepTimerRef.current = setInterval(() => {
            setPrepCountdown(t => {
              if (t <= 1) {
                if (prepTimerRef.current) clearInterval(prepTimerRef.current);
                setIsPreparing(false);
                return 0;
              }
              return t - 1;
            });
          }, 1000);
        } else {
          // All topics recorded
          stream.getTracks().forEach(t => t.stop());
          streamRef.current = null;
          setStep('review');
        }
      };
      mediaRecorderRef.current = recorder;
      recorder.start(1000);
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000);
    } catch (err) {
      toast({ title: "Camera access required", description: "Please allow camera and microphone access to record your teaching demo.", variant: "destructive" });
    }
  }, [currentTopicIndex, selectedTopics]);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const retakeAll = useCallback(() => {
    setRecordedBlobs([]);
    setCurrentTopicIndex(0);
    setRecordingTime(0);
    setStep('prep');
    if (videoRef.current) {
      videoRef.current.src = '';
      videoRef.current.srcObject = null;
    }
  }, []);

  const submitVideos = useCallback(async () => {
    if (recordedBlobs.length === 0 || !applicationId) return;
    setIsUploading(true);
    setStep('evaluating');

    try {
      // Upload each teaching demo separately to avoid file size limits
      const detectedMime = recordingMimeTypeRef.current;
      const fileExt = detectedMime.includes('mp4') ? 'mp4' : 'webm';
      const videoPaths: string[] = [];

      for (let i = 0; i < recordedBlobs.length; i++) {
        const fileName = `${Date.now()}-demo-${i + 1}.${fileExt}`;
        const storagePath = `teaching-videos/${fileName}`;

        const { error: uploadErr } = await supabase.storage
          .from("session-files")
          .upload(storagePath, recordedBlobs[i], { contentType: detectedMime });

        if (uploadErr) throw uploadErr;
        videoPaths.push(storagePath);
      }

      // Store all video paths via RPC (bypasses RLS)
      const videoUrl = videoPaths.join(',');
      await supabase.rpc('set_application_video_url', { app_id: applicationId, video_url: videoUrl });

      const res = await fetch("https://xvmsoedgbwokcnlsywom.supabase.co/functions/v1/evaluate-teaching-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ application_id: applicationId, video_paths: videoPaths }),
      });

      const result = await res.json();

      if (result.success) {
        setStep('done');
        setSubmitted(true);
        localStorage.removeItem('alumni_apply_app_id');
      } else if (result.error?.includes("Transcript too short")) {
        toast({ title: "Recording Issue", description: "We couldn't pick up enough audio from your recording. Please re-record your teaching demos — try speaking louder and closer to the microphone.", variant: "destructive" });
        retakeAll();
      } else {
        throw new Error(result.error || "Evaluation failed");
      }
    } catch (err: any) {
      console.error("Video submission error:", err);
      toast({ title: "Error", description: err.message || "Failed to submit video", variant: "destructive" });
      setStep('review');
    } finally {
      setIsUploading(false);
    }
  }, [recordedBlobs, applicationId]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const inputClasses =
    "w-full px-4 py-3 bg-white border border-[#E5E5EA] rounded-[10px] text-[15px] text-[#1D1D1F] placeholder:text-[#AEAEB2] focus:outline-none focus:border-[#1D1D1F] focus:ring-0 transition-colors duration-200";

  const labelClasses = "text-[14px] font-medium text-[#1D1D1F] mb-1.5 block";

  // Progress bar component
  const stepLabels = ['Application', 'Select Topics', 'Teaching Demo', 'Review'];
  const stepProgress: Record<string, number> = { form: 0, selectTopics: 1, prep: 2, recording: 2, review: 3, evaluating: 3, done: 4 };
  const currentProgress = stepProgress[step] ?? 0;

  const ProgressBar = () => (
    <div className="max-w-2xl mx-auto px-6 pt-28 pb-4">
      <div className="flex items-center justify-between mb-2">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex items-center gap-1" aria-label={i < currentProgress ? `Step ${i + 1} ${label} complete` : `Step ${i + 1} ${label}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
              i < currentProgress ? 'bg-[#1D1D1F] text-white' : i === currentProgress ? 'bg-[#1D1D1F] text-white' : 'bg-[#E5E5EA] text-[#AEAEB2]'
            }`} aria-hidden="true">{i < currentProgress ? '✓' : i + 1}</div>
            <span className={`text-[12px] hidden sm:inline ${i <= currentProgress ? 'text-[#1D1D1F] font-medium' : 'text-[#AEAEB2]'}`}>{label}</span>
          </div>
        ))}
      </div>
      <div className="w-full bg-[#E5E5EA] rounded-full h-1">
        <div className="bg-[#1D1D1F] h-1 rounded-full transition-all duration-500" style={{ width: `${(currentProgress / stepLabels.length) * 100}%` }} />
      </div>
    </div>
  );

  // Step: Evaluating
  if (step === 'evaluating') {
    return (
      <div className="bg-white">
        <ProgressBar />
        <div className="min-h-[50vh] flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <Loader2 className="h-12 w-12 animate-spin text-[#1D1D1F] mx-auto mb-4" />
            <h2 className="text-[28px] font-serif font-bold text-[#1D1D1F] mb-2">Evaluating Your Demo</h2>
            <p className="text-[15px] text-[#86868B] leading-relaxed">
              We're reviewing your {selectedTopics.length} teaching demonstration{selectedTopics.length > 1 ? 's' : ''}. This usually takes about 30 seconds.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Step: Done
  if (step === 'done') {
    return (
      <div className="bg-white">
        <ProgressBar />
        <div className="min-h-[50vh] flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-[#F5F5F7] flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-[#1D1D1F]" />
            </div>
            <h2 className="text-[28px] font-serif font-bold text-[#1D1D1F] mb-2">Application Complete</h2>
            <p className="text-[15px] text-[#86868B] leading-relaxed mb-8">
              Thank you for completing your application and teaching demo. We'll review everything and get back to you within 48 hours.
            </p>
            <a href="https://alumnitutoring.com" className="inline-block px-8 py-3 bg-[#1D1D1F] text-white text-[15px] font-medium rounded-[10px] hover:bg-[#2D2D2F] transition-colors">
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Step: Review recordings before submit
  if (step === 'review') {
    return (
      <div className="bg-white">
        <ProgressBar />
        <div className="max-w-2xl mx-auto px-6 pt-8 pb-16">
          <div className="text-center mb-8">
            <h1 className="text-[28px] md:text-[34px] font-serif font-bold text-[#1D1D1F] mb-3">Review & Submit</h1>
            <p className="text-[15px] text-[#86868B]">You recorded {recordedBlobs.length} teaching demo{recordedBlobs.length > 1 ? 's' : ''}. Ready to submit?</p>
          </div>
          <div className="space-y-4 mb-8">
            {selectedTopics.map((topic, i) => (
              <div key={topic} className="bg-[#F5F5F7] rounded-[14px] p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center text-[13px] font-bold flex-shrink-0">{i + 1}</div>
                <div>
                  <p className="text-[15px] font-medium text-[#1D1D1F]">{topic}</p>
                  <p className="text-[13px] text-[#86868B]">Recorded</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-[#34C759] ml-auto" />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3">
            <button onClick={submitVideos} disabled={isUploading} className="px-6 py-3 bg-[#1D1D1F] text-white text-[15px] font-medium rounded-full hover:bg-[#2D2D2F] transition-colors flex items-center gap-2 disabled:opacity-50">
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Submit Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step: Select topics
  if (step === 'selectTopics') {
    const toggleTopic = (topic: string) => {
      setSelectedTopics(prev =>
        prev.includes(topic) ? prev.filter(t => t !== topic) : prev.length < maxTopics ? [...prev, topic] : prev
      );
    };
    return (
      <div className="bg-white">
        <ProgressBar />
        <div className="max-w-2xl mx-auto px-6 pt-8 pb-16">
          <div className="text-center mb-8">
            <h1 className="text-[28px] md:text-[34px] font-serif font-bold text-[#1D1D1F] mb-3">Choose Your Topics</h1>
            <p className="text-[15px] text-[#86868B] leading-relaxed max-w-lg mx-auto">
              Select up to {maxTopics} AP subject{maxTopics > 1 ? 's' : ''} you'd like to teach. You'll record a 3-5 minute demo for each.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {formData.apScores.map(ap => (
              <button
                key={ap}
                type="button"
                onClick={() => toggleTopic(ap)}
                className={`text-left px-4 py-3 rounded-[10px] text-[14px] transition-all border ${
                  selectedTopics.includes(ap)
                    ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-sm'
                    : 'bg-white text-[#1D1D1F] border-[#E5E5EA] hover:border-[#D1D1D6]'
                }`}
              >
                {ap}
              </button>
            ))}
          </div>
          <p className="text-center text-[13px] text-[#86868B] mb-6">{selectedTopics.length} of {maxTopics} selected</p>
          <div className="flex justify-center">
            <button
              onClick={() => { setCurrentTopicIndex(0); setRecordedBlobs([]); setStep('prep'); }}
              disabled={selectedTopics.length === 0}
              className="px-8 py-3 bg-[#1D1D1F] text-white text-[15px] font-medium rounded-full hover:bg-[#2D2D2F] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue to Recording
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step: Prep countdown + Recording
  if (step === 'prep' || step === 'recording') {
    const currentTopic = selectedTopics[currentTopicIndex] || '';
    const prompt = getPromptForTopic(currentTopic);

    // Start prep on mount
    if (step === 'prep' && !isPreparing && prepCountdown === 30 && !isRecording) {
      startPrep();
    }

    return (
      <div className="bg-white">
        <ProgressBar />
        <div className="max-w-2xl mx-auto px-6 pt-8 pb-16">
          {/* Topic progress */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {selectedTopics.map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${
                i < currentTopicIndex ? 'w-8 bg-[#34C759]' : i === currentTopicIndex ? 'w-12 bg-[#1D1D1F]' : 'w-8 bg-[#E5E5EA]'
              }`} />
            ))}
          </div>

          <div className="text-center mb-6">
            <p className="text-[13px] font-medium text-[#86868B] uppercase tracking-wide">
              Topic {currentTopicIndex + 1} of {selectedTopics.length}
            </p>
            <h1 className="text-[24px] md:text-[28px] font-serif font-bold text-[#1D1D1F] mt-1">{currentTopic}</h1>
          </div>

          {/* Prompt Card */}
          <div className="bg-[#F5F5F7] rounded-[14px] p-5 mb-6">
            <p className="text-[13px] font-medium text-[#86868B] uppercase tracking-wide mb-2">Your prompt</p>
            <p className="text-[15px] text-[#1D1D1F] leading-relaxed">{prompt}</p>
          </div>

          {/* Prep countdown overlay */}
          {isPreparing && (
            <div className="text-center mb-6" aria-live="polite">
              <div className="inline-flex items-center gap-2 bg-[#FFF8E1] border border-[#FFE082] rounded-full px-5 py-2.5">
                <Clock className="h-4 w-4 text-[#F59E0B]" />
                <span className="text-[15px] font-medium text-[#1D1D1F]">Prep time: {prepCountdown}s</span>
              </div>
              <p className="text-[13px] text-[#86868B] mt-2">Review the prompt. Recording starts when you're ready.</p>
              <button onClick={skipPrep} className="text-[13px] text-[#0066CC] underline mt-2">Skip prep</button>
            </div>
          )}

          {/* Video Preview */}
          <div className="relative rounded-[14px] overflow-hidden bg-black aspect-video mb-6">
            <video ref={videoRef} className="w-full h-full object-cover" playsInline />
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full text-[13px] font-medium">
                <Circle className="h-3 w-3 fill-current animate-pulse" />
                {formatTime(recordingTime)}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3">
            {!isRecording && !isPreparing && (
              <button onClick={startRecording} className="px-6 py-3 bg-red-600 text-white text-[15px] font-medium rounded-full hover:bg-red-700 transition-colors flex items-center gap-2">
                <Circle className="h-4 w-4 fill-current" />
                Start Recording
              </button>
            )}
            {isRecording && (
              <button onClick={stopRecording} disabled={recordingTime < 60} className={`px-6 py-3 text-white text-[15px] font-medium rounded-full transition-colors flex items-center gap-2 ${recordingTime < 60 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1D1D1F] hover:bg-[#2D2D2F]'}`}>
                <Square className="h-4 w-4 fill-current" />
                {recordingTime < 60
                  ? `Min 1:00 (${formatTime(recordingTime)})`
                  : currentTopicIndex < selectedTopics.length - 1 ? `Done — Next Topic (${formatTime(recordingTime)})` : `Finish Recording (${formatTime(recordingTime)})`}
              </button>
            )}
          </div>

          {isRecording && recordingTime < 120 && (
            <p className="text-center text-[13px] text-[#AEAEB2] mt-3">Aim for at least 3 minutes per topic.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <ProgressBar />
      {/* Page Header */}
      <div className="max-w-2xl mx-auto text-center px-6 pt-8">
        <h1 className="text-[34px] md:text-[44px] font-serif font-bold text-[#1D1D1F]">
          Become a Tutor
        </h1>
        <p className="text-[17px] text-[#86868B] mt-3 leading-relaxed">
          Join our team of elite alumni tutors and help students achieve their academic goals.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 mt-12 pb-16">
        <form onSubmit={handleSubmit}>
          {/* Name + Gender */}
          <div className="grid gap-4 sm:grid-cols-3 mb-5">
            <div>
              <label htmlFor="firstName" className={labelClasses}>
                First Name <span className="text-[#86868B]">*</span>
              </label>
              <input
                id="firstName"
                className={inputClasses}
                value={formData.firstName}
                onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClasses}>
                Last Name <span className="text-[#86868B]">*</span>
              </label>
              <input
                id="lastName"
                className={inputClasses}
                value={formData.lastName}
                onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
            <div>
              <label htmlFor="gender" className={labelClasses}>
                Gender <span className="text-[#86868B]">*</span>
              </label>
              <select
                id="gender"
                className={inputClasses}
                value={formData.gender}
                onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
                required
              >
                <option value="" disabled>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Email / Phone */}
          <div className="grid gap-4 sm:grid-cols-2 mb-5">
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email <span className="text-[#86868B]">*</span>
              </label>
              <input
                id="email"
                type="email"
                className={inputClasses}
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelClasses}>
                Phone <span className="text-[#86868B]">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                className={inputClasses}
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* High School */}
          <div className="mb-5">
            <label htmlFor="highSchool" className={labelClasses}>
              High School Attended <span className="text-[#86868B]">*</span>
            </label>
            <input
              id="highSchool"
              list="highSchoolOptions"
              placeholder="Start typing your high school..."
              className={inputClasses}
              value={formData.highSchool}
              onChange={(e) => setFormData((prev) => ({ ...prev, highSchool: e.target.value }))}
              required
            />
            <datalist id="highSchoolOptions">
              {['Darien High School','Greenwich High School','New Canaan High School','Ridgefield High School','Staples High School','Brunswick School','Choate Rosemary Hall','Fairfield Prep','Fox Lane High School','GCDS','Hackley School','King School','New Canaan Country School','Rye Country Day School','Sacred Heart Greenwich','St. Luke\'s School','St. Mark\'s School','Weston High School','Wilton High School'].map(s => <option key={s} value={s} />)}
            </datalist>
          </div>

          {/* College */}
          <div className="mb-5">
            <label htmlFor="college" className={labelClasses}>
              College/University <span className="text-[#86868B]">*</span>
            </label>
            <input
              id="college"
              list="collegeOptions"
              placeholder="Start typing your college..."
              className={inputClasses}
              value={formData.college}
              onChange={(e) => setFormData((prev) => ({ ...prev, college: e.target.value }))}
              required
            />
            <datalist id="collegeOptions">
              {['Amherst College','Boston College','Boston University','Bowdoin College','Brown University','Bucknell University','Claremont McKenna College','Colby College','Colgate University','Columbia University','Connecticut College','Cornell University','Dartmouth College','Davidson College','Duke University','Emory University','Fairfield University','Fordham University','George Washington University','Georgetown University','Georgia Tech','Hamilton College','Harvard University','Holy Cross','Indiana University','Johns Hopkins University','Lafayette College','Lehigh University','Middlebury College','MIT','New York University','Northwestern University','Notre Dame','Penn State','Princeton University','Providence College','Rice University','SMU','Stanford University','Syracuse University','Trinity College','Tufts University','Tulane University','UC Berkeley','UCLA','UConn','University of Michigan','University of Pennsylvania','University of Richmond','University of Virginia','University of Wisconsin','USC','Vanderbilt University','Vassar College','Villanova University','Wake Forest University','Washington and Lee University','Washington University in St. Louis','Wellesley College','Wesleyan University','Williams College','Yale University'].map(s => <option key={s} value={s} />)}
            </datalist>
          </div>

          {/* Major / Minor */}
          <div className="grid gap-4 sm:grid-cols-2 mb-5">
            <div>
              <label htmlFor="major" className={labelClasses}>
                Major <span className="text-[#86868B]">*</span>
              </label>
              <input
                id="major"
                list="majorOptions"
                placeholder="Start typing your major..."
                className={inputClasses}
                value={formData.major}
                onChange={(e) => setFormData((prev) => ({ ...prev, major: e.target.value }))}
                required
              />
              <datalist id="majorOptions">
                {['Accounting','Anthropology','Applied Mathematics','Architecture','Art History','Biochemistry','Biology','Biomedical Engineering','Business Administration','Chemical Engineering','Chemistry','Civil Engineering','Classics','Cognitive Science','Communications','Computer Engineering','Computer Science','Data Science','Earth Science','Economics','Education','Electrical Engineering','English','Environmental Science','Environmental Studies','Film Studies','Finance','French','Gender Studies','German','Government','History','Human Biology','Industrial Engineering','Information Science','International Relations','Italian','Journalism','Kinesiology','Latin American Studies','Linguistics','Management','Marketing','Mathematics','Mechanical Engineering','Media Studies','Music','Neuroscience','Nursing','Nutrition','Philosophy','Physics','Political Science','Pre-Med','Psychology','Public Health','Public Policy','Religious Studies','Sociology','Spanish','Statistics','Theater','Urban Studies'].map(s => <option key={s} value={s} />)}
              </datalist>
            </div>
            <div>
              <label htmlFor="minor" className={labelClasses}>Minor</label>
              <input
                id="minor"
                list="minorOptions"
                placeholder="Start typing your minor..."
                className={inputClasses}
                value={formData.minor}
                onChange={(e) => setFormData((prev) => ({ ...prev, minor: e.target.value }))}
              />
              <datalist id="minorOptions">
                {['Accounting','Anthropology','Applied Mathematics','Architecture','Art History','Biochemistry','Biology','Business','Chemistry','Classics','Cognitive Science','Communications','Computer Science','Data Science','Economics','Education','English','Environmental Science','Film Studies','Finance','French','German','Government','History','Italian','Journalism','Linguistics','Marketing','Mathematics','Music','Neuroscience','Philosophy','Physics','Political Science','Psychology','Public Health','Public Policy','Religious Studies','Sociology','Spanish','Statistics','Theater','Urban Studies'].map(s => <option key={s} value={s} />)}
              </datalist>
            </div>
          </div>

          {/* Graduation Year / GPA */}
          <div className="grid gap-4 sm:grid-cols-2 mb-5">
            <div>
              <label htmlFor="graduationYear" className={labelClasses}>
                Expected Graduation Year <span className="text-[#86868B]">*</span>
              </label>
              <select
                id="graduationYear"
                className={inputClasses}
                value={formData.graduationYear}
                onChange={(e) => setFormData((prev) => ({ ...prev, graduationYear: e.target.value }))}
                required
              >
                <option value="">Select year</option>
                {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="collegeGpa" className={labelClasses}>College GPA</label>
              <input
                id="collegeGpa"
                type="number"
                min="0"
                max="4.0"
                step="0.01"
                placeholder="e.g., 3.85"
                className={inputClasses}
                value={formData.collegeGpa}
                onChange={(e) => setFormData((prev) => ({ ...prev, collegeGpa: e.target.value }))}
              />
            </div>
          </div>

          {/* SAT Scores */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <p className={labelClasses + ' mb-0'}>SAT Scores <span className="text-[#86868B]">*</span></p>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, satDidNotTake: !prev.satDidNotTake, satMath: '', satReading: '' }))}
                className={`text-[13px] px-3 py-1 rounded-full border transition-colors ${
                  formData.satDidNotTake ? 'bg-[#1D1D1F] text-white border-[#1D1D1F]' : 'text-[#86868B] border-[#E5E5EA] hover:border-[#D1D1D6]'
                }`}
              >
                Did not take
              </button>
            </div>
            {!formData.satDidNotTake && (
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="satMath" className="text-[12px] text-[#86868B] mb-1 block">Math</label>
                  <select id="satMath" className={inputClasses} value={formData.satMath} onChange={(e) => setFormData((prev) => ({ ...prev, satMath: e.target.value }))}>
                    <option value="">Select score</option>
                    {Array.from({ length: 61 }, (_, i) => 800 - i * 10).map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="satReading" className="text-[12px] text-[#86868B] mb-1 block">Reading & Writing</label>
                  <select id="satReading" className={inputClasses} value={formData.satReading} onChange={(e) => setFormData((prev) => ({ ...prev, satReading: e.target.value }))}>
                    <option value="">Select score</option>
                    {Array.from({ length: 61 }, (_, i) => 800 - i * 10).map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] text-[#86868B] mb-1 block">Superscore</label>
                  <div className={`${inputClasses} bg-[#F5F5F7] text-[#1D1D1F] font-medium`}>
                    {formData.satMath && formData.satReading ? parseInt(formData.satMath) + parseInt(formData.satReading) : '—'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ACT Scores */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <p className={labelClasses + ' mb-0'}>ACT Scores <span className="text-[#86868B]">*</span></p>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, actDidNotTake: !prev.actDidNotTake, actEnglish: '', actMath: '', actReading: '', actScience: '' }))}
                className={`text-[13px] px-3 py-1 rounded-full border transition-colors ${
                  formData.actDidNotTake ? 'bg-[#1D1D1F] text-white border-[#1D1D1F]' : 'text-[#86868B] border-[#E5E5EA] hover:border-[#D1D1D6]'
                }`}
              >
                Did not take
              </button>
            </div>
            {!formData.actDidNotTake && (
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-5">
                <div>
                  <label htmlFor="actEnglish" className="text-[12px] text-[#86868B] mb-1 block">English</label>
                  <select id="actEnglish" className={inputClasses} value={formData.actEnglish} onChange={(e) => setFormData((prev) => ({ ...prev, actEnglish: e.target.value }))}>
                    <option value="">—</option>
                    {Array.from({ length: 36 }, (_, i) => 36 - i).map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="actMath" className="text-[12px] text-[#86868B] mb-1 block">Math</label>
                  <select id="actMath" className={inputClasses} value={formData.actMath} onChange={(e) => setFormData((prev) => ({ ...prev, actMath: e.target.value }))}>
                    <option value="">—</option>
                    {Array.from({ length: 36 }, (_, i) => 36 - i).map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="actReading" className="text-[12px] text-[#86868B] mb-1 block">Reading</label>
                  <select id="actReading" className={inputClasses} value={formData.actReading} onChange={(e) => setFormData((prev) => ({ ...prev, actReading: e.target.value }))}>
                    <option value="">—</option>
                    {Array.from({ length: 36 }, (_, i) => 36 - i).map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="actScience" className="text-[12px] text-[#86868B] mb-1 block">Science</label>
                  <select id="actScience" className={inputClasses} value={formData.actScience} onChange={(e) => setFormData((prev) => ({ ...prev, actScience: e.target.value }))}>
                    <option value="">—</option>
                    {Array.from({ length: 36 }, (_, i) => 36 - i).map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] text-[#86868B] mb-1 block">Composite</label>
                  <div className={`${inputClasses} bg-[#F5F5F7] text-[#1D1D1F] font-medium`}>
                    {formData.actEnglish && formData.actMath && formData.actReading && formData.actScience
                      ? Math.round((parseInt(formData.actEnglish) + parseInt(formData.actMath) + parseInt(formData.actReading) + parseInt(formData.actScience)) / 4)
                      : '—'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AP Count */}
          <div className="mb-5">
            <div className="sm:w-1/3">
              <label htmlFor="apFivesCount" className={labelClasses}>Number of AP 5's Earned</label>
              <input
                id="apFivesCount"
                type="number"
                min="0"
                max="38"
                placeholder="e.g., 8"
                className={inputClasses}
                value={formData.apFivesCount}
                onChange={(e) => setFormData((prev) => ({ ...prev, apFivesCount: e.target.value }))}
              />
            </div>
          </div>

          {/* AP Scores */}
          <div className="mb-5">
            <label className={labelClasses}>
              AP Exams Scored 4 or 5 <span className="text-[#86868B]">*</span>
            </label>
            <p className="text-[13px] text-[#AEAEB2] mb-3">Select all AP exams where you earned a 4 or 5.</p>
            <div className="grid grid-cols-2 gap-2">
              {apClassOptions.map((ap) => (
                <button
                  key={ap}
                  type="button"
                  onClick={() => toggleApScore(ap)}
                  aria-pressed={formData.apScores.includes(ap)}
                  className={`text-left px-3 py-2 rounded-[8px] text-[13px] transition-colors border ${
                    formData.apScores.includes(ap)
                      ? 'bg-[#1D1D1F] text-white border-[#1D1D1F]'
                      : 'bg-white text-[#1D1D1F] border-[#E5E5EA] hover:border-[#D1D1D6]'
                  }`}
                >
                  {ap}
                </button>
              ))}
            </div>
            {formData.apScores.length > 0 && (
              <p className="text-[13px] text-[#86868B] mt-2">{formData.apScores.length} selected</p>
            )}
          </div>

          {/* Preferred Subjects to Tutor */}
          <div className="mb-5">
            <label className={labelClasses}>
              What subjects do you want to tutor? <span className="text-[#86868B]">*</span>
            </label>
            <p className="text-[13px] text-[#AEAEB2] mb-3">Select all that apply.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Mathematics', 'Science', 'English', 'History', 'Economics', 'Computer Science', 'Languages', 'SAT Prep', 'ACT Prep', 'Test Prep', 'College Counseling', 'Writing'].map(subj => (
                <button
                  key={subj}
                  type="button"
                  aria-pressed={formData.preferredSubjects.includes(subj)}
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    preferredSubjects: prev.preferredSubjects.includes(subj)
                      ? prev.preferredSubjects.filter(s => s !== subj)
                      : [...prev.preferredSubjects, subj],
                  }))}
                  className={`text-left px-3 py-2 rounded-[8px] text-[13px] transition-colors border ${
                    formData.preferredSubjects.includes(subj)
                      ? 'bg-[#1D1D1F] text-white border-[#1D1D1F]'
                      : 'bg-white text-[#1D1D1F] border-[#E5E5EA] hover:border-[#D1D1D6]'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>

          {/* Availability — Weekly Time Grid */}
          <div className="mb-5">
            <label className={labelClasses}>
              When are you available to tutor? <span className="text-[#86868B]">*</span>
            </label>
            <p className="text-[13px] text-[#AEAEB2] mb-3">Click to select your available time slots. Note: typical sessions are one hour each.</p>
            {(() => {
              const days = [
                { key: 'monday', short: 'Mon' }, { key: 'tuesday', short: 'Tue' },
                { key: 'wednesday', short: 'Wed' }, { key: 'thursday', short: 'Thu' },
                { key: 'friday', short: 'Fri' }, { key: 'saturday', short: 'Sat' },
                { key: 'sunday', short: 'Sun' },
              ];
              const hours = Array.from({ length: 34 }, (_, i) => {
                const totalMin = 7 * 60 + i * 30;
                const h = Math.floor(totalMin / 60);
                const m = totalMin % 60;
                return { time: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`, h, m };
              });
              return (
                <div className="border border-[#E5E5EA] rounded-[14px] overflow-hidden">
                  {/* Column headers — days */}
                  <div className="grid grid-cols-[56px_repeat(7,1fr)] bg-[#F5F5F7]">
                    <div className="p-2" />
                    {days.map(d => (
                      <div key={d.key} className="p-2 text-[12px] font-semibold text-[#1D1D1F] text-center border-l border-[#E5E5EA]/50">{d.short}</div>
                    ))}
                  </div>
                  {/* Time rows */}
                  <div className="max-h-[400px] overflow-y-auto">
                    {hours.map(({ time, h, m }) => {
                      const isHourStart = m === 0;
                      const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
                      const ampm = h >= 12 ? 'PM' : 'AM';
                      return (
                        <div key={time} className={`grid grid-cols-[56px_repeat(7,1fr)] ${isHourStart ? 'border-t border-[#E5E5EA]/80' : ''}`}>
                          <div className="flex items-center justify-end pr-2 text-[10px] text-[#AEAEB2] tabular-nums">
                            {isHourStart ? `${displayH} ${ampm}` : ''}
                          </div>
                          {days.map(d => {
                            const slotKey = `${d.key}-${time}`;
                            const isSelected = formData.availabilitySchedule.includes(slotKey);
                            return (
                              <button
                                key={slotKey}
                                type="button"
                                onClick={() => setFormData(prev => ({
                                  ...prev,
                                  availabilitySchedule: prev.availabilitySchedule.includes(slotKey)
                                    ? prev.availabilitySchedule.filter(s => s !== slotKey)
                                    : [...prev.availabilitySchedule, slotKey],
                                }))}
                                className={`h-5 border-l border-[#E5E5EA]/30 transition-colors ${
                                  isSelected
                                    ? 'bg-emerald-400 hover:bg-emerald-500'
                                    : 'bg-white hover:bg-emerald-50'
                                }`}
                                title={`${d.short} ${displayH}:${m.toString().padStart(2, '0')} ${ampm}`}
                              />
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
            {formData.availabilitySchedule.length > 0 && (
              <div className="flex items-center justify-between mt-2">
                <p className="text-[12px] text-[#86868B]">{formData.availabilitySchedule.length} slots selected ({Math.round(formData.availabilitySchedule.length * 0.5)} hours/week)</p>
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, availabilitySchedule: [] }))} className="text-[12px] text-[#0066CC] hover:underline">Clear all</button>
              </div>
            )}
          </div>

          {/* Bio */}
          <div className="mb-5">
            <label htmlFor="bio" className={labelClasses}>About Yourself <span className="text-[#86868B]">*</span></label>
            <textarea
              id="bio"
              placeholder="Tell us about your background, teaching philosophy, and why you want to tutor. What makes you a great fit for Alumni Tutoring? (minimum 50 words)"
              className={`${inputClasses} min-h-[120px] resize-y`}
              value={formData.bio}
              onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
              required
            />
            <p className={`text-[11px] mt-1 ${formData.bio.trim().split(/\s+/).filter(Boolean).length >= 50 ? 'text-green-600' : 'text-[#AEAEB2]'}`}>
              {formData.bio.trim().split(/\s+/).filter(Boolean).length}/50 words minimum
            </p>
          </div>

          {/* LinkedIn */}
          <div className="mb-5">
            <label htmlFor="linkedin" className={labelClasses}>LinkedIn Profile URL</label>
            <input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              className={inputClasses}
              value={formData.linkedinUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
            />
          </div>

          {/* Prior Experience */}
          <div className="mb-5">
            <label htmlFor="priorExperience" className={labelClasses}>Prior Tutoring Experience <span className="text-[#86868B]">*</span></label>
            <textarea
              id="priorExperience"
              placeholder="Describe any prior tutoring, teaching, or mentoring experience. Include subjects taught, ages/grades, duration, and any results or impact. (minimum 30 words)"
              className={`${inputClasses} min-h-[120px] resize-y`}
              value={formData.priorExperience}
              onChange={(e) => setFormData((prev) => ({ ...prev, priorExperience: e.target.value }))}
              required
            />
            <p className={`text-[11px] mt-1 ${formData.priorExperience.trim().split(/\s+/).filter(Boolean).length >= 30 ? 'text-green-600' : 'text-[#AEAEB2]'}`}>
              {formData.priorExperience.trim().split(/\s+/).filter(Boolean).length}/30 words minimum
            </p>
          </div>

          {/* Reference */}
          <div className="grid gap-4 sm:grid-cols-2 mb-5">
            <div>
              <label htmlFor="referenceName" className={labelClasses}>Reference Name</label>
              <input
                id="referenceName"
                placeholder="e.g., Professor Jane Smith"
                className={inputClasses}
                value={formData.referenceName}
                onChange={(e) => setFormData((prev) => ({ ...prev, referenceName: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="referenceEmail" className={labelClasses}>Reference Email</label>
              <input
                id="referenceEmail"
                type="email"
                placeholder="e.g., jsmith@university.edu"
                className={inputClasses}
                value={formData.referenceEmail}
                onChange={(e) => setFormData((prev) => ({ ...prev, referenceEmail: e.target.value }))}
              />
            </div>
          </div>

          {/* How did you hear about us */}
          <div className="mb-5">
            <label htmlFor="referralSource" className={labelClasses}>How did you hear about us? <span className="text-[#86868B]">*</span></label>
            <select
              id="referralSource"
              className={inputClasses}
              value={formData.referralSource}
              onChange={(e) => setFormData((prev) => ({ ...prev, referralSource: e.target.value }))}
              required
            >
              <option value="">Select one</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Instagram">Instagram</option>
              <option value="Friend/Referral">Friend / Referral</option>
              <option value="School">School</option>
              <option value="Google">Google</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="TikTok">TikTok</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Resume Upload */}
          <div className="mb-5">
            <label className={labelClasses}>
              Resume <span className="text-[#86868B]">*</span>
            </label>
            <input
              id="resume"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              required={!formData.resumeFile}
            />
            <div
              onClick={() => document.getElementById("resume")?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); document.getElementById('resume')?.click(); } }}
              className="border border-dashed border-[#E5E5EA] rounded-[10px] p-6 text-center hover:border-[#D1D1D6] transition-colors cursor-pointer"
            >
              <Upload className="h-5 w-5 text-[#86868B] mx-auto mb-2" />
              <p className="text-[15px] font-medium text-[#1D1D1F]">
                {formData.resumeFile ? formData.resumeFile.name : "Upload Resume"}
              </p>
              <p className="text-[13px] text-[#AEAEB2] mt-1">PDF only, one page max</p>
            </div>
            {formData.resumeFile && (
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, resumeFile: null }))}
                className="text-[13px] text-[#86868B] mt-2 underline underline-offset-2 hover:text-[#1D1D1F] transition-colors"
              >
                Remove file
              </button>
            )}
          </div>

          {/* Headshot Upload */}
          <div className="mb-5">
            <label className={labelClasses}>
              Professional Headshot <span className="text-[#86868B]">*</span>
            </label>
            <input
              id="headshot"
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleHeadshotChange}
              className="hidden"
              required={!formData.headshotFile}
            />
            <div
              onClick={() => !headshotValidating && document.getElementById("headshot")?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (!headshotValidating && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); document.getElementById('headshot')?.click(); } }}
              className={`border border-dashed border-[#E5E5EA] rounded-[10px] p-6 text-center transition-colors ${headshotValidating ? 'opacity-60' : 'hover:border-[#D1D1D6] cursor-pointer'}`}
            >
              {headshotValidating ? (
                <>
                  <Loader2 className="h-5 w-5 text-[#86868B] mx-auto mb-2 animate-spin" />
                  <p className="text-[15px] font-medium text-[#1D1D1F]">Verifying photo...</p>
                  <p className="text-[13px] text-[#AEAEB2] mt-1">Checking that this is a valid headshot</p>
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5 text-[#86868B] mx-auto mb-2" />
                  <p className="text-[15px] font-medium text-[#1D1D1F]">
                    {formData.headshotFile ? formData.headshotFile.name : "Upload Headshot"}
                  </p>
                  <p className="text-[13px] text-[#AEAEB2] mt-1">Clear photo of your face — JPG, PNG, WEBP (max 5MB)</p>
                </>
              )}
            </div>
            {formData.headshotFile && (
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, headshotFile: null }))}
                className="text-[13px] text-[#86868B] mt-2 underline underline-offset-2 hover:text-[#1D1D1F] transition-colors"
              >
                Remove file
              </button>
            )}
          </div>

          {/* Submit */}
          <div className="mt-8 flex justify-center">
            <div className="rounded-full bg-[#F0F0F5]/60 backdrop-blur-sm border border-[#D1D1D6]/50 shadow-[0_1px_12px_rgba(0,0,0,0.04)] p-1.5 inline-flex w-full md:w-auto">
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative overflow-hidden bg-[#0A1628] text-white rounded-full h-11 w-full md:w-auto px-7 text-[15px] font-medium shadow-[0_2px_12px_rgba(10,22,40,0.3)] hover:bg-[#0D1D33] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                {isSubmitting ? (
                  <>
                    <Loader2 className="relative z-10 h-4 w-4 animate-spin" />
                    <span className="relative z-10">Submitting...</span>
                  </>
                ) : (
                  <span className="relative z-10">Submit Application</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
