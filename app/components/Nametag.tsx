"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Code2, Bot, ChevronRight } from "lucide-react";
import { useState } from "react";

export function Nametag() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-3 right-3 md:bottom-4 md:right-4 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <Link
        href="https://souravinsights.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative flex items-center gap-2">
            {/* Animated Icon Container */}
            <div className="relative w-6 h-6 md:w-7 md:h-7 bg-blue-500/10 rounded-md">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  rotateY: isHovered ? 180 : 0,
                  opacity: isHovered ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <Code2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500" />
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ rotateY: -180 }}
                animate={{
                  rotateY: isHovered ? 0 : -180,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500" />
              </motion.div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col">
              <div className="text-[10px] md:text-xs text-muted-foreground">
                crafted by
              </div>
              <motion.div
                className="text-xs md:text-sm font-medium text-foreground flex items-center gap-1"
                animate={{
                  x: isHovered ? 2 : 0,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                souravinsights
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
