"use client";

import { AnimatePresence, motion, type Transition } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition(props: { children: React.ReactNode }) {
  const { children } = props;
  const pathname = usePathname();
  const isLessons = pathname.includes("/lessons");
  const isAuth = pathname.includes("/auth");
  const isHome = pathname === "/" || /\/[a-z]{2}$/.test(pathname);

  const variants = {
    initial: isLessons
      ? { opacity: 0, y: 18, scale: 0.98 }
      : isAuth
        ? { opacity: 0, x: 24 }
        : { opacity: 0, y: 12 },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    exit: isHome
      ? { opacity: 0, y: -10 }
      : isAuth
        ? { opacity: 0, x: -24 }
        : { opacity: 0, y: -12 },
  };

  const transition: Transition = isLessons
    ? { duration: 0.45, ease: [0.2, 0.7, 0.2, 1] as const }
    : isAuth
      ? { duration: 0.3, ease: "easeOut" }
      : { duration: 0.35, ease: "easeOut" };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="page-transition"
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
