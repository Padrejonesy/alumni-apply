import { useRef, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { Rating, RatingButton } from "@/components/kibo-ui/rating";

// University logos for trust bar
import harvardLogo from "@/assets/harvard-logo.webp";
import yaleLogo from "@/assets/yale-logo.webp";
import princetonLogo from "@/assets/princeton-logo.webp";
import columbiaLogo from "@/assets/columbia-logo.webp";
import brownLogo from "@/assets/brown-logo.webp";
import cornellLogo from "@/assets/cornell-logo.webp";
import dartmouthLogo from "@/assets/dartmouth-logo.webp";
import pennLogo from "@/assets/penn-logo.webp";
import stanfordLogo from "@/assets/stanford-logo.webp";
import mitLogo from "@/assets/mit-logo.webp";

const universityLogos = [
  { src: harvardLogo, slug: "harvarduniversity" },
  { src: yaleLogo, slug: "yaleuniversity" },
  { src: princetonLogo, slug: "princetonuniversity" },
  { src: columbiaLogo, slug: "columbiauniversity" },
  { src: brownLogo, slug: "brownuniversity" },
  { src: cornellLogo, slug: "cornelluniversity" },
  { src: dartmouthLogo, slug: "dartmouthcollege" },
  { src: pennLogo, slug: "universityofpennsylvania" },
  { src: stanfordLogo, slug: "stanforduniversity" },
  { src: mitLogo, slug: "massachusettsinstituteoftechnology" },
];

// Seeded random for deterministic scatter positions
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

type AnimVariant = "explode" | "cascade" | "vortex";

function ParallaxCharacter({
  char,
  index,
  total,
  scrollYProgress,
  variant,
  scrollStart,
  scrollEnd,
}: {
  char: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  variant: AnimVariant;
  scrollStart: number;
  scrollEnd: number;
}) {
  const isSpace = char === " ";
  const normalized = total > 1 ? index / (total - 1) : 0.5;
  const rand1 = seededRandom(index * 7 + 1);
  const rand2 = seededRandom(index * 13 + 2);
  const rand3 = seededRandom(index * 19 + 3);

  // Each character has a staggered entrance within the scroll range
  const stagger = normalized * 0.15;
  const charStart = scrollStart + stagger;
  const charEnd = scrollEnd;

  // Compute scatter origins based on variant
  let initX: number, initY: number, initRotate: number, initScale: number;

  if (variant === "explode") {
    // Characters fly in from random directions far away
    const angle = rand1 * Math.PI * 2;
    const distance = 300 + rand2 * 500;
    initX = Math.cos(angle) * distance;
    initY = Math.sin(angle) * distance - 100;
    initRotate = (rand3 - 0.5) * 720;
    initScale = 0.2 + rand2 * 0.5;
  } else if (variant === "cascade") {
    // Characters rain down from above with horizontal spread
    initX = (normalized - 0.5) * 600 + (rand1 - 0.5) * 200;
    initY = -400 - rand2 * 300;
    initRotate = (rand3 - 0.5) * 180;
    initScale = 0.3 + rand1 * 0.4;
  } else {
    // Vortex: spiral inward from circular positions
    const spiralAngle = normalized * Math.PI * 4 + rand1 * Math.PI;
    const spiralRadius = 250 + rand2 * 350;
    initX = Math.cos(spiralAngle) * spiralRadius;
    initY = Math.sin(spiralAngle) * spiralRadius;
    initRotate = spiralAngle * (180 / Math.PI) + (rand3 - 0.5) * 360;
    initScale = 0.1 + rand2 * 0.6;
  }

  const x = useTransform(scrollYProgress, [charStart, charEnd], [initX, 0]);
  const y = useTransform(scrollYProgress, [charStart, charEnd], [initY, 0]);
  const rotate = useTransform(scrollYProgress, [charStart, charEnd], [initRotate, 0]);
  const scale = useTransform(scrollYProgress, [charStart, charEnd], [initScale, 1]);
  const opacity = useTransform(
    scrollYProgress,
    [charStart, charStart + (charEnd - charStart) * 0.3, charEnd],
    [0, 0.6, 1],
  );

  if (isSpace) {
    return <span className="inline-block w-[0.3em]" />;
  }

  return (
    <motion.span
      className="inline-block text-[#1D1D1F] will-change-transform"
      style={{ x, y, rotate, scale, opacity }}
    >
      {char}
    </motion.span>
  );
}

function ParallaxText({
  text,
  scrollYProgress,
  variant,
  scrollStart,
  scrollEnd,
  className,
}: {
  text: string;
  scrollYProgress: MotionValue<number>;
  variant: AnimVariant;
  scrollStart: number;
  scrollEnd: number;
  className?: string;
}) {
  const words = text.split(" ");

  const { chars: charElements } = useMemo(() => {
    let globalIndex = 0;
    const totalNonSpace = text.replace(/ /g, "").length;
    const elements: { wordIdx: number; char: string; index: number; total: number }[] = [];

    words.forEach((word, wordIdx) => {
      word.split("").forEach((char) => {
        elements.push({ wordIdx, char, index: globalIndex++, total: totalNonSpace });
      });
      // space between words
      if (wordIdx < words.length - 1) {
        elements.push({ wordIdx, char: " ", index: -1, total: totalNonSpace });
      }
    });

    return { chars: elements };
  }, [text]);

  // Group chars by word
  const wordGroups: { wordIdx: number; chars: typeof charElements }[] = [];
  let currentWord: typeof charElements = [];
  let currentWordIdx = 0;

  charElements.forEach((el) => {
    if (el.wordIdx !== currentWordIdx) {
      wordGroups.push({ wordIdx: currentWordIdx, chars: currentWord });
      currentWord = [];
      currentWordIdx = el.wordIdx;
    }
    currentWord.push(el);
  });
  wordGroups.push({ wordIdx: currentWordIdx, chars: currentWord });

  return (
    <div
      className={cn("flex flex-wrap justify-center gap-x-0", className)}
      style={{ perspective: "1200px" }}
    >
      {wordGroups.map((group) => (
        <span key={group.wordIdx} className="inline-flex whitespace-nowrap">
          {group.chars.map((el, i) => (
            <ParallaxCharacter
              key={`${group.wordIdx}-${i}`}
              char={el.char}
              index={el.index}
              total={el.total}
              scrollYProgress={scrollYProgress}
              variant={variant}
              scrollStart={scrollStart}
              scrollEnd={scrollEnd}
            />
          ))}
          {group.wordIdx < words.length - 1 && <span className="inline-block w-[0.3em]" />}
        </span>
      ))}
    </div>
  );
}

export function HeroSection() {
  const navigate = useNavigate();
  const animRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: animRef,
    offset: ["start end", "end center"],
  });

  const subtitleOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.4, 0.55], [40, 0]);

  return (
    <section className="relative bg-white overflow-x-clip">
      {/* Hero content */}
      <div className="relative max-w-3xl mx-auto px-4 pt-28 md:pt-32 text-center flex flex-col items-center">
        <a
          href="https://www.google.com/search?sca_esv=a034994e941f7d25&rlz=1C1UEAD_enUS1125US1125&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOZRt1LyXxhRegYiOos3842k6D19aXB75IfORbU8NJgLADUQ4-hPYuBSmuHVsLeccL8YHYI__Nd_YAN8IiXwgZPoGnXPN&q=Alumni+Tutoring+Reviews&sa=X&ved=2ahUKEwieiMfc2PiSAxUB7TgGHQTqKP8Q0bkNegQIJRAF&biw=1536&bih=730&dpr=1.25"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 mb-6 hover:opacity-70 transition-opacity"
        >
          <Rating defaultValue={5} readOnly>
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingButton className="text-[#B8860B]" key={index} size={16} />
            ))}
          </Rating>
          <span className="text-[#D1D1D6] text-[14px]">·</span>
          <p className="text-[14px] text-[#86868B]">Trusted by 550+ families</p>
        </a>
        <h1 className="font-serif font-bold tracking-[-0.03em] text-[#1D1D1F] leading-[1.1] text-[32px] sm:text-[48px] md:text-[64px] mb-5">
          Tutored by Someone Who
          <br />
          Aced Your Kid's Exact Classes
        </h1>

        <p className="text-[17px] text-[#86868B] max-w-sm mx-auto leading-relaxed mb-8">
          Connect with elite graduates from your high school who've walked the same hallways, mastered the same courses,
          learned from the same teachers, and aced the same tests.
        </p>

        <div className="mx-auto mt-8 rounded-full bg-[#F0F0F5]/60 backdrop-blur-sm border border-[#D1D1D6]/50 shadow-[0_1px_12px_rgba(0,0,0,0.04)] p-1.5 inline-flex">
          <button
            onClick={() => window.open("https://calendly.com/tutoringalumni/consultation", "_blank")}
            className="relative overflow-hidden bg-[#0A1628] text-white rounded-full h-11 px-7 text-[15px] font-medium shadow-[0_2px_12px_rgba(10,22,40,0.3)] hover:bg-[#0D1D33] transition-all duration-200 flex items-center gap-2"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
            <span className="relative z-10">Schedule a Consultation</span>
            <ArrowUpRight className="relative z-10 w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Image Collage — fan layout */}
      <div className="relative w-screen left-[50%] -translate-x-[50%] h-[400px] md:h-[520px] mt-12">
        {/* Card 1 — Princeton campus — far left */}
        <div className="absolute w-[160px] md:w-[220px] lg:w-[260px] aspect-[3/4] rounded-[16px] overflow-hidden border-[4px] border-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] left-[2%] md:left-[5%] top-[25%] -rotate-[12deg] z-[1]">
          <img src="/hero-princeton.webp" alt="" className="w-full h-full object-cover" loading="eager" decoding="async" />
        </div>

        {/* Card 2 — Students — mid left */}
        <div className="absolute w-[170px] md:w-[230px] lg:w-[270px] aspect-[3/4] rounded-[16px] overflow-hidden border-[4px] border-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] left-[16%] md:left-[20%] top-[12%] -rotate-[6deg] z-[2]">
          <img src="/hero-students.webp" alt="" className="w-full h-full object-cover" loading="eager" decoding="async" />
        </div>

        {/* Card 3 — Library group — center hero card (largest) */}
        <div className="absolute w-[190px] md:w-[250px] lg:w-[290px] aspect-[3/4] rounded-[16px] overflow-hidden border-[4px] border-white shadow-[0_12px_50px_rgba(0,0,0,0.15)] left-[50%] -translate-x-[50%] top-[5%] rotate-0 z-[3]">
          <img src="/hero-graduation.webp" alt="" className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" />
        </div>

        {/* Card 4 — Collaborating — mid right */}
        <div className="absolute w-[170px] md:w-[230px] lg:w-[270px] aspect-[3/4] rounded-[16px] overflow-hidden border-[4px] border-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] right-[16%] md:right-[20%] top-[12%] rotate-[6deg] z-[2]">
          <img src="/hero-library.webp" alt="" className="w-full h-full object-cover" loading="eager" decoding="async" />
        </div>

        {/* Card 5 — Graduation — far right */}
        <div className="absolute w-[160px] md:w-[220px] lg:w-[260px] aspect-[3/4] rounded-[16px] overflow-hidden border-[4px] border-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] right-[2%] md:right-[5%] top-[25%] rotate-[12deg] z-[1]">
          <img src="/hero-studying.webp" alt="" className="w-full h-full object-cover" loading="eager" decoding="async" />
        </div>

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-white via-white/90 to-transparent z-[10] pointer-events-none" />
      </div>

      {/* University Logos */}
      <p className="text-center text-[13px] tracking-[0.2em] uppercase text-[#AEAEB2] font-medium pt-8 mb-6">
        // alumni tutors attending \\
      </p>
      <div className="max-w-4xl mx-auto grid grid-cols-5 md:grid-cols-10 gap-6 items-center justify-items-center px-8 pb-12">
        {universityLogos.map((uni, i) => (
          <button
            key={i}
            onClick={() => navigate(`/alumnitutors/${uni.slug}`)}
            className="hover:opacity-70 transition-opacity cursor-pointer"
          >
            <img src={uni.src} alt="" className="h-10 md:h-12 object-contain" loading="eager" decoding="async" />
          </button>
        ))}
      </div>

      {/* Scroll-animated parallax text below logos */}
      <div ref={animRef} className="relative min-h-[120vh] flex flex-col items-center justify-start px-4">
        <div className="sticky top-[30vh] space-y-4 pt-12">
          <ParallaxText
            text="Same School."
            scrollYProgress={scrollYProgress}
            variant="explode"
            scrollStart={0.0}
            scrollEnd={0.25}
            className="font-serif font-bold text-[28px] sm:text-[40px] md:text-[56px] tracking-[-0.03em] leading-[1.1]"
          />
          <ParallaxText
            text="Same Teachers."
            scrollYProgress={scrollYProgress}
            variant="cascade"
            scrollStart={0.08}
            scrollEnd={0.35}
            className="font-serif font-bold text-[28px] sm:text-[40px] md:text-[56px] tracking-[-0.03em] leading-[1.1]"
          />
          <ParallaxText
            text="Better Grades."
            scrollYProgress={scrollYProgress}
            variant="vortex"
            scrollStart={0.16}
            scrollEnd={0.45}
            className="font-serif font-bold text-[28px] sm:text-[40px] md:text-[56px] tracking-[-0.03em] leading-[1.1]"
          />
          <div className="text-center pt-4">
            <motion.p
              className="text-[15px] text-[#86868B] max-w-md mx-auto leading-relaxed"
              style={{ opacity: subtitleOpacity, y: subtitleY }}
            >
              Our tutors graduated from the same high schools they tutor at — they know the curriculum, the teachers, and exactly what it takes to succeed.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
