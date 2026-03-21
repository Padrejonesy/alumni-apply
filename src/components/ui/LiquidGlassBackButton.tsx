import { useState } from "react";

interface LiquidGlassBackButtonProps {
  count?: number;
  onClick?: () => void;
}

const LiquidGlassBackButton = ({ count = 0, onClick }: LiquidGlassBackButtonProps) => {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onClick={onClick}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 28px 14px 22px",
        border: "none",
        borderRadius: "100px",
        cursor: "pointer",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: pressed ? "scale(0.94)" : "scale(1)",
        background: `linear-gradient(
          160deg,
          rgba(255, 255, 255, 0.65) 0%,
          rgba(255, 255, 255, 0.35) 20%,
          rgba(240, 243, 247, 0.3) 50%,
          rgba(220, 225, 232, 0.35) 80%,
          rgba(255, 255, 255, 0.45) 100%
        )`,
        backdropFilter: "blur(40px) saturate(1.8)",
        WebkitBackdropFilter: "blur(40px) saturate(1.8)",
        boxShadow: `
          0 0.5px 0 0 rgba(255, 255, 255, 0.85) inset,
          0 -0.5px 0 0 rgba(0, 0, 0, 0.05) inset,
          0 1px 3px rgba(0, 0, 0, 0.06),
          0 4px 12px rgba(0, 0, 0, 0.05),
          0 8px 24px rgba(0, 0, 0, 0.04)
        `,
        outline: "none",
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
      }}
    >
      {/* Inner highlight edge */}
      <div
        style={{
          position: "absolute",
          inset: "0.5px",
          borderRadius: "100px",
          border: "0.5px solid rgba(255, 255, 255, 0.5)",
          pointerEvents: "none",
        }}
      />

      {/* Top specular highlight */}
      <div
        style={{
          position: "absolute",
          top: "1px",
          left: "15%",
          right: "15%",
          height: "40%",
          borderRadius: "100px 100px 50% 50%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Chevron */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        style={{
          marginRight: "2px",
          transition: "transform 0.2s ease",
          transform: pressed ? "translateX(-1px)" : "translateX(0)",
        }}
      >
        <path
          d="M14 5L8 11L14 17"
          stroke="#1c1c1e"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Notification Badge */}
      {count > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "26px",
            height: "26px",
            borderRadius: "13px",
            padding: "0 7px",
            background: "#1c1c1e",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "-0.2px",
            lineHeight: 1,
            marginLeft: "2px",
            transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: pressed ? "scale(0.9)" : "scale(1)",
          }}
        >
          {count > 99 ? "99+" : count}
        </div>
      )}
    </button>
  );
};

export default LiquidGlassBackButton;
