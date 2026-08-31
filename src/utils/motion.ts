import type { Transition, Variants } from "framer-motion";

type Direction = "left" | "right" | "up" | "down" | "";

// "" lets framer-motion pick the generator; some sections call it that way.
type AnimationType = "spring" | "tween" | "keyframes" | "inertia" | "";

const withType = (type: AnimationType): Pick<Transition, "type"> =>
  type ? { type } : {};

export const textVariant = (delay: number): Variants => ({
  hidden: {
    y: -50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.25,
      delay,
    },
  },
});

export const fadeIn = (
  direction: Direction,
  type: AnimationType,
  delay: number,
  duration: number,
): Variants => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      ...withType(type),
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const zoomIn = (delay: number, duration: number): Variants => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const slideIn = (
  direction: Direction,
  type: AnimationType,
  delay: number,
  duration: number,
): Variants => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      ...withType(type),
      delay,
      duration,
      ease: "easeOut",
    },
  },
});
