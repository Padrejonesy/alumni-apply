import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const categories = [
  {
    label: "Our Services",
    faqs: [
      {
        question: "What subjects does Alumni Tutoring offer?",
        answer: "Alumni Tutoring offers a wide range of subjects, including every subject from grades 6-12. Subjects include: Math, English, Writing, Science, Language, Computer Science, Economics, History, and more!"
      },
      {
        question: "What age groups does Alumni Tutoring serve?",
        answer: "We offer tutoring services for a variety of age groups, from middle school students to high school and college-level learners."
      },
      {
        question: "Does Alumni Tutoring offer online tutoring sessions?",
        answer: "Yes, Alumni Tutoring provides online tutoring sessions via Zoom since our tutors are scattered at top universities across the country."
      },
      {
        question: "Does Alumni Tutoring offer group tutoring?",
        answer: "Yes. While most students prefer one-on-one sessions, we also provide small group tutoring for friends or classmates who want to learn together."
      }
    ]
  },
  {
    label: "Getting Started",
    faqs: [
      {
        question: "How do I get started with Alumni Tutoring?",
        answer: "Just pick a time on our Calendly booking page for a free 15-minute consultation. We'll learn more about your goals and recommend the best tutor and plan for you."
      },
      {
        question: "How long is each session?",
        answer: "Most sessions are 60 minutes. We also offer shorter check-ins and longer deep-dive lessons depending on your needs."
      },
      {
        question: "What if I need to reschedule a session?",
        answer: "No problem! We ask for at least 24 hours' notice to reschedule, and we'll help you find a new time that works."
      },
      {
        question: "Do you provide progress updates?",
        answer: "Yes. Parents receive regular updates on their student's progress, test readiness, and next steps upon request."
      }
    ]
  },
  {
    label: "Our Tutors",
    faqs: [
      {
        question: "Who are the tutors at Alumni Tutoring?",
        answer: "Our tutors are standout alumni from your high school who now attend or have graduated from top universities across the country. Each tutor is thoroughly vetted for subject expertise, teaching ability, and professionalism."
      },
      {
        question: "How are tutors matched with students?",
        answer: "We carefully match students with tutors based on subject needs, learning goals, personality fit, and—if requested—gender preference. If the first match isn't the right fit, we'll discount the session and quickly reassign a new tutor."
      }
    ]
  }
];

export function FAQSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="max-w-5xl mx-auto px-6 py-32">
      {/* Header */}
      <p className="text-[13px] uppercase tracking-[0.1em] text-[#86868B] font-medium text-center">
        {'// '}QUESTIONS{'\\\\'}
      </p>
      <h2 className="text-[36px] md:text-[48px] font-serif font-bold text-[#1D1D1F] text-center mt-3 leading-tight">
        Common Questions
      </h2>

      {/* Category pills */}
      <div className="flex justify-center gap-2 mt-10 mb-10">
        {categories.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => setActive(i)}
            className={`px-5 py-2.5 text-[14px] font-medium rounded-full transition-all ${
              active === i
                ? 'bg-[#1D1D1F] text-white'
                : 'text-[#86868B] bg-[#F5F5F7] hover:text-[#1D1D1F] hover:bg-[#EDEDF0]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ accordion — single column */}
      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible>
          {categories[active].faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b border-[#E5E5EA] border-t-0 border-l-0 border-r-0 rounded-none px-0"
            >
              <AccordionTrigger className="text-left text-[16px] font-medium text-[#1D1D1F] py-5 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-[#86868B] leading-relaxed pb-5 pt-0">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-2xl mx-auto text-center py-20">
        <h3 className="text-[24px] font-serif font-bold text-[#1D1D1F]">
          Still have questions?
        </h3>
        <p className="text-[15px] text-[#86868B] mt-3">
          Schedule a free consultation to discuss your specific needs.
        </p>
        <div className="flex justify-center mt-6">
          <div className="rounded-full bg-[#F0F0F5]/60 backdrop-blur-sm border border-[#D1D1D6]/50 shadow-[0_1px_12px_rgba(0,0,0,0.04)] p-1.5 inline-flex">
            <a
              href="https://calendly.com/tutoringalumni/consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden bg-[#0A1628] text-white rounded-full h-11 px-7 text-[15px] font-medium shadow-[0_2px_12px_rgba(10,22,40,0.3)] hover:bg-[#0D1D33] transition-all duration-200 flex items-center gap-2"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
              <span className="relative z-10">Schedule a Consultation</span>
              <ArrowUpRight className="relative z-10 w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
