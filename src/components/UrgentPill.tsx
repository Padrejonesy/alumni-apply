import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const UrgentPill = () => {
  const [open, setOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const bottomOffset = isMobile ? 78 : 16;

  return (
    <>
      <style>{`
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(14px) scale(0.9); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes backdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes optionSlide0 {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes optionSlide1 {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes goldShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes urgent-letter-anim {
          50% { text-shadow: 0 0 3px #fff8; color: #fff; }
        }
        @keyframes urgent-flicker {
          50% { opacity: 0.3; }
        }
        @keyframes urgent-appear {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes urgent-focused-letter {
          0%, 100% { filter: blur(0px); }
          50% { transform: scale(2); filter: blur(10px) brightness(150%) drop-shadow(-36px 12px 12px hsl(40, 100%, 70%)); }
        }

        .urgent-btn {
          --border-radius: 24px;
          --padding: 4px;
          --transition: 0.4s;
          --button-color: #101010;
          --highlight-color-hue: 40deg;
          user-select: none;
          display: flex;
          justify-content: center;
          padding: 0.45em 0.45em 0.45em 0.9em;
          font-family: "Inter", -apple-system, sans-serif;
          font-size: 0.85em;
          font-weight: 400;
          background-color: var(--button-color);
          box-shadow:
            inset 0px 1px 1px rgba(255,255,255,0.2),
            inset 0px 2px 2px rgba(255,255,255,0.15),
            inset 0px 4px 4px rgba(255,255,255,0.1),
            inset 0px 8px 8px rgba(255,255,255,0.05),
            0px -1px 1px rgba(0,0,0,0.02),
            0px -2px 2px rgba(0,0,0,0.03),
            0px -4px 4px rgba(0,0,0,0.05),
            0px -8px 8px rgba(0,0,0,0.06);
          border: solid 1px #fff2;
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: box-shadow var(--transition), border var(--transition), background-color var(--transition);
          position: relative;
          z-index: 901;
          outline: none;
        }
        .urgent-btn::before {
          content: "";
          position: absolute;
          top: calc(0px - var(--padding));
          left: calc(0px - var(--padding));
          width: calc(100% + var(--padding) * 2);
          height: calc(100% + var(--padding) * 2);
          border-radius: calc(var(--border-radius) + var(--padding));
          pointer-events: none;
          background-image: linear-gradient(0deg, #0004, #000a);
          z-index: -1;
          transition: box-shadow var(--transition), filter var(--transition);
          box-shadow:
            0 -8px 8px -6px #0000 inset,
            0 -16px 16px -8px #00000000 inset,
            1px 1px 1px #fff2,
            2px 2px 2px #fff1,
            -1px -1px 1px #0002,
            -2px -2px 2px #0001;
        }
        .urgent-btn::after {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          border-radius: inherit;
          pointer-events: none;
          background-image: linear-gradient(0deg, #fff, hsl(40, 100%, 70%), hsla(40, 100%, 70%, 50%), 8%, transparent);
          background-position: 0 0;
          opacity: 0;
          transition: opacity var(--transition), filter var(--transition);
        }
        .urgent-btn-letter {
          position: relative;
          display: inline-block;
          color: #fff5;
          animation: urgent-letter-anim 2s ease-in-out infinite;
          transition: color var(--transition), text-shadow var(--transition), opacity var(--transition);
        }
        .urgent-btn-svg {
          flex-grow: 1;
          height: 20px;
          margin-right: 0.4rem;
          fill: #e8e8e8;
          animation: urgent-flicker 2s linear infinite 0.5s;
          filter: drop-shadow(0 0 2px #fff9);
          transition: fill var(--transition), filter var(--transition), opacity var(--transition);
        }
        .urgent-btn .urgent-txt-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 5em;
        }
        .urgent-btn:hover {
          border: solid 1px hsla(40, 100%, 80%, 40%);
        }
        .urgent-btn:hover::before {
          box-shadow:
            0 -8px 8px -6px #fffa inset,
            0 -16px 16px -8px hsla(40, 100%, 70%, 30%) inset,
            1px 1px 1px #fff2,
            2px 2px 2px #fff1,
            -1px -1px 1px #0002,
            -2px -2px 2px #0001;
        }
        .urgent-btn:hover::after {
          opacity: 1;
          mask-image: linear-gradient(0deg, #fff, transparent);
        }
        .urgent-btn:hover .urgent-btn-svg {
          fill: #fff;
          filter: drop-shadow(0 0 3px hsl(40, 100%, 70%)) drop-shadow(0 -4px 6px #0009);
          animation: none;
        }
        .urgent-btn:active {
          border: solid 1px hsla(40, 100%, 80%, 70%);
          background-color: hsla(40, 50%, 20%, 0.5);
        }
        .urgent-btn:active::before {
          box-shadow:
            0 -8px 12px -6px #fffa inset,
            0 -16px 16px -8px hsla(40, 100%, 70%, 80%) inset,
            1px 1px 1px #fff4,
            2px 2px 2px #fff2,
            -1px -1px 1px #0002,
            -2px -2px 2px #0001;
        }
        .urgent-btn:active::after {
          opacity: 1;
          mask-image: linear-gradient(0deg, #fff, transparent);
          filter: brightness(200%);
        }
        .urgent-btn:active .urgent-btn-letter {
          text-shadow: 0 0 1px hsla(40, 100%, 90%, 90%);
          animation: none;
        }
        .urgent-btn-letter:nth-child(1) { animation-delay: 0s; }
        .urgent-btn-letter:nth-child(2) { animation-delay: 0.08s; }
        .urgent-btn-letter:nth-child(3) { animation-delay: 0.16s; }
        .urgent-btn-letter:nth-child(4) { animation-delay: 0.24s; }
        .urgent-btn-letter:nth-child(5) { animation-delay: 0.32s; }
        .urgent-btn-letter:nth-child(6) { animation-delay: 0.4s; }
        .urgent-btn-letter:nth-child(7) { animation-delay: 0.48s; }

        .urgent-close-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: rgba(28,28,30,0.85);
          cursor: pointer;
          z-index: 901;
          position: relative;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.3s ease;
          outline: none;
        }
        .urgent-close-btn:hover {
          background: rgba(28,28,30,1);
          transform: scale(1.05);
        }
      `}</style>

      <div style={{ position: "fixed", bottom: `${bottomOffset}px`, right: "12px", zIndex: 900 }}>

        {/* Expanded contact card */}
        {open && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 899,
                background: "rgba(0,0,0,0.06)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
                animation: "backdropIn 0.25s ease-out",
              }}
            />

            {/* Card */}
            <div
              style={{
                position: "absolute", bottom: "44px", right: 0,
                width: "310px", maxWidth: "calc(100vw - 32px)",
                background: "white",
                borderRadius: "20px",
                boxShadow: "0 16px 48px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.03)",
                overflow: "hidden",
                zIndex: 902,
                animation: "cardReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Gold shimmer bar */}
              <div
                style={{
                  height: "2px",
                  background: "linear-gradient(90deg, transparent 0%, #D4A844 30%, #E8C876 50%, #D4A844 70%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "goldShimmer 3s ease-in-out infinite",
                }}
              />

              {/* Header */}
              <div style={{ padding: "18px 18px 0 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      margin: 0, fontSize: "15px", fontWeight: 700,
                      color: "#1c1c1e", letterSpacing: "-0.3px",
                    }}>
                      Need help tonight?
                    </p>
                    <p style={{
                      margin: "3px 0 0 0", fontSize: "12px",
                      color: "#86868b",
                    }}>
                      We typically respond within minutes.
                    </p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    style={{
                      width: "24px", height: "24px", borderRadius: "50%",
                      background: "rgba(0,0,0,0.04)", border: "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", flexShrink: 0, marginTop: "1px",
                    }}
                  >
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path d="M1 1L9 9M9 1L1 9" stroke="#86868b" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Contact options */}
              <div style={{ padding: "12px 8px 6px 8px" }}>

                {/* Text option */}
                <a
                  href="sms:2033602450"
                  onMouseEnter={() => setHoveredOption("text")}
                  onMouseLeave={() => setHoveredOption(null)}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "12px", borderRadius: "14px", textDecoration: "none",
                    background: hoveredOption === "text" ? "rgba(52,199,89,0.06)" : "transparent",
                    transition: "all 0.2s ease",
                    animation: "optionSlide0 0.35s ease-out 0.08s both",
                    cursor: "pointer", marginBottom: "2px",
                  }}
                >
                  <div style={{
                    width: "38px", height: "38px", borderRadius: "11px",
                    background: "linear-gradient(135deg, #34C759, #30B350)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 3px 8px rgba(52,199,89,0.2)",
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white" opacity="0.95" />
                      <circle cx="8" cy="10" r="1.2" fill="#34C759" />
                      <circle cx="12" cy="10" r="1.2" fill="#34C759" />
                      <circle cx="16" cy="10" r="1.2" fill="#34C759" />
                    </svg>
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#1c1c1e" }}>
                      Text us now
                    </p>
                    <p style={{ margin: "1px 0 0 0", fontSize: "12px", color: "#86868b" }}>
                      (203) 360-2450
                    </p>
                  </div>
                  <svg width="6" height="10" viewBox="0 0 7 12" fill="none" style={{
                    transition: "transform 0.2s ease",
                    transform: hoveredOption === "text" ? "translateX(3px)" : "translateX(0)",
                  }}>
                    <path d="M1 1L6 6L1 11" stroke="#C7C7CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                {/* Email option */}
                <a
                  href="mailto:info@alumnitutoring.com?subject=Urgent%20Tutoring%20Request"
                  onMouseEnter={() => setHoveredOption("email")}
                  onMouseLeave={() => setHoveredOption(null)}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "12px", borderRadius: "14px", textDecoration: "none",
                    background: hoveredOption === "email" ? "rgba(0,122,255,0.05)" : "transparent",
                    transition: "all 0.2s ease",
                    animation: "optionSlide1 0.35s ease-out 0.16s both",
                    cursor: "pointer",
                  }}
                >
                  <div style={{
                    width: "38px", height: "38px", borderRadius: "11px",
                    background: "linear-gradient(135deg, #007AFF, #0068D6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 3px 8px rgba(0,122,255,0.2)",
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="4" width="20" height="16" rx="3" fill="white" opacity="0.95" />
                      <path d="M2 7L12 13L22 7" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#1c1c1e" }}>
                      Email us
                    </p>
                    <p style={{ margin: "1px 0 0 0", fontSize: "12px", color: "#86868b" }}>
                      info@alumnitutoring.com
                    </p>
                  </div>
                  <svg width="6" height="10" viewBox="0 0 7 12" fill="none" style={{
                    transition: "transform 0.2s ease",
                    transform: hoveredOption === "email" ? "translateX(3px)" : "translateX(0)",
                  }}>
                    <path d="M1 1L6 6L1 11" stroke="#C7C7CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              {/* Footer */}
              <div style={{
                padding: "10px 18px 14px 18px",
                borderTop: "1px solid rgba(0,0,0,0.04)",
              }}>
                <p style={{
                  margin: 0, fontSize: "11.5px", color: "#86868b",
                  lineHeight: "1.5",
                }}>
                  For non-urgent inquiries,{" "}
                  <a href="/#faq" onClick={() => setOpen(false)} style={{
                    color: "#D4A844", fontWeight: 600, textDecoration: "none",
                    borderBottom: "1px solid rgba(212,168,68,0.3)",
                  }}>book a free consultation</a>
                </p>
              </div>
            </div>
          </>
        )}

        {/* Urgent button */}
        {open ? (
          <button
            className="urgent-close-btn"
            onClick={() => setOpen(false)}
          >
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M4 4L14 14M14 4L4 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        ) : (
          <button
            className="urgent-btn"
            onClick={() => setOpen(true)}
          >
            <svg className="urgent-btn-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <span className="urgent-txt-wrapper">
              {"Urgent?".split("").map((char, i) => (
                <span key={i} className="urgent-btn-letter">{char}</span>
              ))}
            </span>
          </button>
        )}

      </div>
    </>
  );
};

export default UrgentPill;
