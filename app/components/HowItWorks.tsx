"use client";

import { motion } from "framer-motion";
import { Upload, Sparkles, Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Upload Resume",
    description: "Simply upload your resume in PDF format",
    icon: Upload,
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    borderColor: "border-blue-200",
  },
  {
    title: "AI Analysis",
    description: "Our AI analyzes your skills and experience",
    icon: Sparkles,
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    borderColor: "border-purple-200",
  },
  {
    title: "Find Matches",
    description: "Get matched with relevant opportunities",
    icon: Search,
    bgColor: "bg-green-500/10",
    textColor: "text-green-500",
    borderColor: "border-green-200",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            How it Works
          </motion.h2>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 hidden md:block" />

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                {/* Step Card */}
                <div
                  className={cn(
                    "relative p-6 rounded-2xl border transition-all duration-300",
                    "hover:shadow-lg hover:-translate-y-1",
                    step.borderColor,
                    "bg-white"
                  )}
                >
                  {/* Icon Circle */}
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center mx-auto",
                      "transition-transform duration-500 group-hover:scale-110",
                      step.bgColor
                    )}
                  >
                    <step.icon className={cn("w-8 h-8", step.textColor)} />
                  </div>

                  <h3 className="text-xl font-semibold mt-6 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>

                  {/* Decorative Number */}
                  <div
                    className={cn(
                      "absolute -top-4 -right-4 w-8 h-8 rounded-full",
                      "flex items-center justify-center text-sm font-bold",
                      step.bgColor,
                      step.textColor
                    )}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Connecting Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
