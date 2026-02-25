"use client";

import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";

type RevealVariant = "block" | "text" | "fade";

export default function Reveal(props: {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
}) {
  const { children, className, variant = "block", delay = 0 } = props;
  const reduceMotion = useReducedMotion();

  const variants: Record<RevealVariant, Variants> = {
    block: {
      hidden: { opacity: 0, y: 16, scale: 0.98 },
      show: { opacity: 1, y: 0, scale: 1 },
    },
    text: {
      hidden: { opacity: 0, y: 10 },
      show: { opacity: 1, y: 0 },
    },
    fade: {
      hidden: { opacity: 0 },
      show: { opacity: 1 },
    },
  };

  const transition: Transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.2, 0.7, 0.2, 1] as const, delay };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants[variant]}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
