import React from "react";

type MotionProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const MOTION_PROPS_TO_OMIT = new Set([
  "animate",
  "exit",
  "initial",
  "layout",
  "layoutId",
  "transition",
  "variants",
  "viewport",
  "whileHover",
  "whileInView",
  "whileTap",
]);

const cleanProps = (props: Record<string, unknown>) => {
  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!MOTION_PROPS_TO_OMIT.has(key)) {
      next[key] = value;
    }
  }
  return next;
};

const createMotionComponent = (tag: keyof JSX.IntrinsicElements) =>
  React.forwardRef<HTMLElement, MotionProps>(({ children, ...props }, ref) =>
    React.createElement(tag, { ...cleanProps(props), ref }, children)
  );

const motionProxy = new Proxy(
  {},
  {
    get: (_, key: string) => createMotionComponent((key || "div") as keyof JSX.IntrinsicElements),
  }
) as Record<string, React.ComponentType<MotionProps>>;

export const motion = motionProxy;
export const m = motionProxy;
export const domAnimation = {};
export const AnimatePresence = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
export const LazyMotion = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
export const useScroll = () => ({ scrollYProgress: 0 });
export const useTransform = (_value: unknown, _input: unknown, output: unknown) =>
  Array.isArray(output) ? output[output.length - 1] : output;
export type MotionValue<T> = T;
