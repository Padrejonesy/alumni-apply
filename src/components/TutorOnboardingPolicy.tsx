import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface Props {
  tutorName: string;
  onSign: (signature: string, date: string) => void;
}

export function TutorOnboardingPolicy({ tutorName, onSign }: Props) {
  const [signature, setSignature] = useState("");
  const [agreed, setAgreed] = useState(false);
  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const canSign = signature.trim().length > 2 && agreed;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <img src="/alumni-tutoring-logo-color.webp" alt="Alumni Tutoring" className="h-14 mx-auto mb-4" />
        <h1 className="text-[32px] font-serif font-bold text-[#1D1D1F]">Tutor Agreement & Code of Conduct</h1>
        <p className="text-[15px] text-[#86868B] mt-2">Alumni Tutoring LLC</p>
      </div>

      <div className="prose prose-sm max-w-none text-[#1D1D1F] space-y-6 text-[14px] leading-relaxed">

        <p className="text-[#86868B] italic">
          This agreement is entered into between Alumni Tutoring LLC ("Alumni Tutoring," "the Company") and the undersigned tutor ("Tutor," "you"). By signing below, you acknowledge that you have read, understood, and agree to be bound by the following terms.
        </p>

        {/* 1. Compensation */}
        <section>
          <h2 className="text-[18px] font-semibold mt-8 mb-2">1. Compensation</h2>
          <p>
            Tutors are compensated at a rate of <strong>$30.00 per hour</strong> for all completed sessions. Certain tutors may be grandfathered in at a rate of $40.00 per hour at the sole discretion of Alumni Tutoring. Rates are subject to review and adjustment by the Company.
          </p>
        </section>

        {/* 2. Payment */}
        <section>
          <h2 className="text-[18px] font-semibold mt-8 mb-2">2. Payment Terms</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Tutors are paid <strong>weekly on Sundays</strong>, with payments subject to earlier disbursement at the Company's discretion.</li>
            <li>All payments are processed exclusively through <strong>Venmo</strong>.</li>
            <li>Payment is contingent upon the Tutor having completed <strong>all three</strong> of the following by the payment cutoff:
              <ol className="list-decimal pl-5 mt-1 space-y-1">
                <li>Uploaded a valid <strong>W-9 tax form</strong></li>
                <li>Set <strong>availability hours</strong> for the upcoming week</li>
                <li>Submitted <strong>tutor session summaries</strong> for all completed sessions</li>
              </ol>
            </li>
            <li>Failure to complete any of the above will result in payment being withheld until compliance is met.</li>
          </ul>
        </section>

        {/* 3. Scheduling & Cancellations */}
        <section>
          <h2 className="text-[18px] font-semibold mt-8 mb-2">3. Scheduling & Cancellations</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Tutors must provide a minimum of <strong>24 hours' notice</strong> for any session cancellation.</li>
            <li>Repeated late cancellations or no-shows will result in disciplinary action, up to and including termination.</li>
            <li>Most sessions are assigned on a <strong>first-come, first-serve basis</strong>. Tutors are expected to be active on the platform, have <strong>push notifications enabled</strong>, and respond promptly to session requests.</li>
          </ul>
        </section>

        {/* 4. Communication Policy */}
        <section>
          <h2 className="text-[18px] font-semibold mt-8 mb-2">4. Communication Policy</h2>
          <p>
            <strong>All communication</strong> with students, parents, and families must occur exclusively through the Alumni Tutoring portal. Tutors are strictly prohibited from communicating with clients through any external channel, including and not limited to:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Personal text messages or phone calls</li>
            <li>Personal email</li>
            <li>Social media (Instagram, Snapchat, TikTok, Facebook, etc.)</li>
            <li>Any other messaging platform outside the Alumni Tutoring portal</li>
          </ul>
          <p className="mt-2">Violation of this policy is grounds for immediate termination.</p>
        </section>

        {/* 5. Confidentiality */}
        <section>
          <h2 className="text-[18px] font-semibold mt-8 mb-2">5. Confidentiality</h2>
          <p>
            Tutors agree to maintain strict confidentiality regarding all student and family information, including but not limited to: names, grades, academic performance, personal circumstances, contact information, and session content. This obligation survives termination of the tutor relationship.
          </p>
        </section>

        {/* 6. Professionalism */}
        <section>
          <h2 className="text-[18px] font-semibold mt-8 mb-2">6. Professionalism & Session Standards</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Tutors must maintain a professional appearance during all video sessions, including camera on, appropriate attire, and a clean, distraction-free background.</li>
            <li>Tutors must be <strong>diligent and prompt</strong> in responding to messages, session requests, and platform notifications.</li>
            <li>Tutors must log <strong>session notes and summaries</strong> after every session. Incomplete records will delay payment.</li>
          </ul>
        </section>

        {/* 7. Non-Compete & Non-Solicitation */}
        <section>
          <h2 className="text-[18px] font-semibold mt-8 mb-2">7. Non-Compete & Non-Solicitation</h2>
          <p>
            During the term of this agreement and for a period of <strong>twelve (12) months</strong> following termination, the Tutor agrees to the following:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>The Tutor shall not provide paid tutoring services to any student or family introduced through Alumni Tutoring, whether directly or through any other tutoring firm, platform, or service.</li>
            <li>The Tutor shall not solicit, recruit, or accept business from any Alumni Tutoring client for private or competing tutoring services.</li>
            <li>The Tutor shall not work with Alumni Tutoring students through any competing tutoring firm or platform.</li>
          </ul>
          <p className="mt-2">Violation of this clause constitutes a material breach and may result in legal action.</p>
        </section>

        {/* 8. Intellectual Property */}
        <section>
          <h2 className="text-[18px] font-semibold mt-8 mb-2">8. Intellectual Property</h2>
          <p>
            All materials created, shared, or produced in connection with Alumni Tutoring sessions — including but not limited to lesson plans, worksheets, recordings, and session notes — are the property of <strong>Alumni Tutoring LLC</strong>.
          </p>
        </section>

        {/* 9. Termination */}
        <section>
          <h2 className="text-[18px] font-semibold mt-8 mb-2">9. Termination</h2>
          <p>
            Termination of the tutor relationship is at the sole discretion of Alumni Tutoring. Under non-illegal circumstances, the Company will generally issue a warning before escalation. However, the following may result in immediate termination without prior warning:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Communication with clients outside the platform</li>
            <li>Soliciting clients for private tutoring</li>
            <li>Any form of misconduct, harassment, or inappropriate behavior</li>
            <li>Breach of confidentiality</li>
            <li>Providing false information on the application</li>
          </ul>
        </section>

        {/* 10. The Alumni Tutoring Pledge */}
        <section className="mt-10 border-t border-[#E5E5EA] pt-8">
          <h2 className="text-[22px] font-serif font-bold text-center mb-6">The Alumni Tutoring Pledge</h2>
          <div className="bg-gradient-to-br from-[#1D2B44] to-[#2A3F5F] text-white rounded-2xl p-8 space-y-4 text-[15px] leading-relaxed">
            <p className="italic text-white/80 text-center text-[13px] mb-4">
              Every tutor who joins Alumni Tutoring makes this commitment.
            </p>
            <p>
              I was once a student at the same school where I now tutor. I sat in the same classrooms, walked the same halls, and faced the same challenges. I remember what it felt like to be confused, overwhelmed, or unsure of myself — and I remember the people who helped me through it.
            </p>
            <p>
              Now it's my turn.
            </p>
            <p>
              <strong>I pledge to treat every student as if they were the only student I have.</strong> I will prepare for every session, show up on time, and bring my full attention and energy. I will never phone it in.
            </p>
            <p>
              <strong>I pledge to be patient above all else.</strong> I will meet students where they are, not where I think they should be. I will explain things ten different ways if that's what it takes. I will never make a student feel stupid for asking a question.
            </p>
            <p>
              <strong>I pledge to go beyond the textbook.</strong> I will share the strategies, habits, and mindset that got me into a top university — not just the formulas. I will be a mentor, not just a tutor.
            </p>
            <p>
              <strong>I pledge to put the client first, always.</strong> The families who trust Alumni Tutoring are investing in their children's futures. That trust is sacred. I will honor it with professionalism, reliability, and genuine care.
            </p>
            <p>
              <strong>I pledge to represent Alumni Tutoring with integrity.</strong> On and off the platform, I will conduct myself in a way that reflects the excellence this company stands for.
            </p>
            <p className="text-center font-semibold text-[17px] pt-4 border-t border-white/20 mt-6">
              I don't tutor because it's a job. I tutor because I've been where my students are — and I know I can help them get where they're going.
            </p>
          </div>
        </section>

        {/* Signature */}
        <section className="mt-10 border-t border-[#E5E5EA] pt-8">
          <h2 className="text-[18px] font-semibold mb-4">Acknowledgment & Signature</h2>
          <p className="mb-6">
            By signing below, I, <strong>{tutorName || "the undersigned"}</strong>, acknowledge that I have read and understood all terms of this Tutor Agreement & Code of Conduct, including the Alumni Tutoring Pledge. I agree to be bound by these terms as a condition of my engagement with Alumni Tutoring LLC.
          </p>

          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[#D1D1D6] text-[#1D1D1F] focus:ring-[#1D1D1F]"
              />
              <span className="text-[13px] text-[#1D1D1F]">
                I have read, understood, and agree to all terms of this agreement, including the Alumni Tutoring Pledge, the Non-Compete & Non-Solicitation clause, the Communication Policy, and all other provisions outlined above.
              </span>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-[12px] font-medium text-[#86868B] uppercase tracking-wide block mb-1.5">Full Legal Name</label>
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Type your full name as signature"
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D1D6] bg-white text-[15px] font-serif italic text-[#1D1D1F] placeholder:text-[#AEAEB2] placeholder:not-italic focus:outline-none focus:ring-2 focus:ring-[#1D1D1F] focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#86868B] uppercase tracking-wide block mb-1.5">Date</label>
                <div className="w-full px-4 py-3 rounded-xl border border-[#D1D1D6] bg-[#F5F5F7] text-[15px] text-[#1D1D1F]">
                  {today}
                </div>
              </div>
            </div>

            <button
              onClick={() => canSign && onSign(signature, today)}
              disabled={!canSign}
              className="w-full mt-4 px-6 py-3.5 bg-[#1D1D1F] text-white text-[15px] font-semibold rounded-full hover:bg-[#2D2D2F] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              Sign & Accept Agreement
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
