/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "motion/react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Generate random dots for background decoration
  const dots = Array.from({ length: 20 }, () => ({
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 2,
  }));

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-slate-200 dark:bg-slate-800"
            style={{
              width: dot.size,
              height: dot.size,
              left: `${dot.x}%`,
              top: `${dot.y}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4">
          {/* Main Quote */}
          <p className="text-base text-muted-foreground">
            © {currentYear} LevelMeUp. No rights reserved{" "}
            <span className="hidden sm:inline">
              — built-in AI to help you find your next opportunity
            </span>
          </p>

          {/* Inspiration Quote */}
          <p className="text-sm text-muted-foreground/80 font-serif italic">
            "The only way to do great work is to love what you do.{" "}
            <span className="hidden sm:inline">
              If you haven't found it yet, keep looking. Don't settle."
            </span>
          </p>
          <p className="text-xs text-muted-foreground/60">— Steve Jobs</p>
        </div>

        {/* Decorative separator */}
        <div className="mt-8 flex items-center justify-center">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
          <div className="mx-2 w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
    </footer>
  );
}
