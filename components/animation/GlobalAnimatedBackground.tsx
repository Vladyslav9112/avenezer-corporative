"use client";

import { motion } from "framer-motion";

export default function GlobalAnimatedBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden bg-[#4f8c83]"
    >
      {/* blob 1 */}
      <motion.div
        className="
          absolute
          -top-24 -left-24
          h-[260px] w-[260px]
          sm:h-[320px] sm:w-[320px]
          md:h-[420px] md:w-[420px]
          rounded-full bg-white/10 blur-1xl
        "
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 120, 40, 0],
          scale: [1, 1.12, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {/* blob 2 */}
      <motion.div
        className="
          absolute
          -bottom-28 -right-24
          h-[320px] w-[320px]
          sm:h-[420px] sm:w-[420px]
          md:h-[520px] md:w-[520px]
          rounded-full bg-[#6fb1a6]/30 blur-1xl
        "
        animate={{
          x: [0, -120, 60, 0],
          y: [0, -140, -40, 0],
          scale: [1, 1.1, 1.04, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {/* global glow */}
      <motion.div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_top,#6fb1a680,transparent_60%)]
        "
        animate={{ opacity: [0.6, 0.9, 0.7, 0.6] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
