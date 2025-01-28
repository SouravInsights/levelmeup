"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CTASection() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-4xl mx-auto relative">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-background p-6 md:p-12 rounded-2xl border shadow-lg overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute inset-0 z-0">
            <svg
              className="absolute w-full h-full scale-150 md:scale-100"
              viewBox="0 0 800 400"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Circles */}
              <circle
                cx="90%"
                cy="20%"
                r="15%"
                className="fill-slate-100 dark:fill-slate-800"
                opacity="0.5"
              />
              <circle
                cx="95%"
                cy="30%"
                r="8%"
                className="fill-slate-100 dark:fill-slate-800"
                opacity="0.3"
              />

              {/* Waves */}
              <path
                d="M0 80% Q 25% 70% 50% 80% T 100% 80%"
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M0 85% Q 25% 75% 50% 85% T 100% 85%"
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center space-y-6 md:space-y-8">
            {/* Floating dots */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className={cn(
                  "absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full",
                  "bg-blue-400 dark:bg-blue-500"
                )}
                style={{ top: "20%", left: "10%" }}
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  delay: 1,
                  repeat: Infinity,
                }}
                className={cn(
                  "absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full",
                  "bg-purple-400 dark:bg-purple-500"
                )}
                style={{ top: "60%", left: "85%" }}
              />
            </div>

            {/* Main text content */}
            <div className="space-y-3 md:space-y-4">
              <motion.h2
                className="text-2xl md:text-4xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Ready to Find Your Perfect Role?
              </motion.h2>
              <motion.p
                className="text-base md:text-lg text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Upload your resume and let our AI find the best matches for your
                skills
              </motion.p>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full px-6 md:px-8 h-11 md:h-12 text-sm md:text-base"
              >
                <Link href="/analyze">
                  Upload Resume <Upload className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Features */}
            <motion.div
              className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-xs md:text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400 shrink-0" />
                No sign up required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400 shrink-0" />
                100% free
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div
          className={cn(
            "absolute -top-3 -right-3 md:-top-6 md:-right-6 w-8 h-8 md:w-12 md:h-12 rounded-full",
            "bg-blue-500/10 dark:bg-blue-500/20"
          )}
        />
        <div
          className={cn(
            "absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-6 h-6 md:w-8 md:h-8 rounded-full",
            "bg-purple-500/10 dark:bg-purple-500/20"
          )}
        />
      </div>
    </section>
  );
}
