export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "We've had an amazing experience. My daughter met with two different tutors who helped develop her confidence in AP Pre-Calculus and prepared her for her AP exams.",
      name: "Parent",
      subject: "AP Pre-Calculus & AP Calculus",
    },
    {
      quote: "My son was struggling with AP Physics and had lost much confidence. After just a few sessions, he's understanding the concepts, getting good grades, and actually enjoys physics!",
      name: "Parent",
      subject: "AP Physics",
    },
    {
      quote: "We were matched with a wonderful tutor who was not only flexible with schedule changes but gave my child the confidence she needed to improve her score.",
      name: "Parent",
      subject: "SAT Prep",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#F5F5F7] via-white to-[#F5F5F7] py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-[13px] uppercase tracking-[0.1em] text-[#86868B] font-medium text-center">
          WHAT PARENTS SAY
        </p>
        <h2 className="text-[34px] md:text-[44px] font-serif font-bold text-[#1D1D1F] text-center mt-3 leading-tight">
          Real results from real families.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/40 backdrop-blur-xl border border-[#E5E5EA]/50 rounded-[20px] p-6">
              <p className="text-[15px] text-[#1D1D1F] leading-[1.7] italic">
                "{t.quote}"
              </p>
              <div className="mt-5 pt-4 border-t border-[#E5E5EA]/40">
                <p className="text-[14px] font-medium text-[#1D1D1F]">{t.name}</p>
                <p className="text-[13px] text-[#86868B]">{t.subject}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-10">
          <a
            href="https://www.google.com/search?sca_esv=a034994e941f7d25&rlz=1C1UEAD_enUS1125US1125&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOZRt1LyXxhRegYiOos3842k6D19aXB75IfORbU8NJgLADUQ4-hPYuBSmuHVsLeccL8YHYI__Nd_YAN8IiXwgZPoGnXPN&q=Alumni+Tutoring+Reviews&sa=X&ved=2ahUKEwieiMfc2PiSAxUB7TgGHQTqKP8Q0bkNegQIJRAF&biw=1536&bih=730&dpr=1.25"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-medium text-[#1D1D1F] underline underline-offset-4 decoration-[#D1D1D6] hover:decoration-[#1D1D1F] transition-colors"
          >
            Read more on Google Reviews →
          </a>
        </p>
      </div>
    </section>
  );
}
