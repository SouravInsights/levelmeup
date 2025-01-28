/* eslint-disable react/no-unescaped-entities */

"use client";

import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { LayoutGroup, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Scale,
  Briefcase,
  Laptop,
  Server,
  CloudCog,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import TextRotate from "@/components/fancy/text-rotate";
import { HowItWorks } from "./components/HowItWorks";
import { cn } from "@/lib/utils";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { Nametag } from "./components/Nametag";

const roles = [
  {
    icon: Code2,
    title: "Frontend Engineer",
    description: "Build beautiful user interfaces with React, Vue, or Svelte",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    borderColor: "border-blue-200",
    skills: ["React", "Vue", "Svelte", "UI/UX", "Web Performance"],
  },
  {
    icon: Server,
    title: "Backend Engineer",
    description: "Design scalable systems and robust APIs",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    borderColor: "border-purple-200",
    skills: ["APIs", "Databases", "System Design", "Cloud"],
  },
  {
    icon: Laptop,
    title: "Fullstack Engineer",
    description: "Master both frontend and backend development",
    bgColor: "bg-green-500/10",
    textColor: "text-green-500",
    borderColor: "border-green-200",
    skills: ["End-to-end", "Full App Lifecycle", "Architecture"],
  },
  {
    icon: CloudCog,
    title: "DevOps Engineer",
    description: "Automate and optimize infrastructure",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-500",
    borderColor: "border-orange-200",
    skills: ["CI/CD", "Cloud", "Infrastructure", "Monitoring"],
  },
  {
    icon: Scale,
    title: "Corporate Lawyer",
    description: "Navigate complex business transactions",
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-500",
    borderColor: "border-indigo-200",
    skills: ["M&A", "Venture Capital", "Compliance", "Due Diligence"],
  },
  {
    icon: Briefcase,
    title: "IP Lawyer",
    description: "Protect and manage intellectual property",
    bgColor: "bg-rose-500/10",
    textColor: "text-rose-500",
    borderColor: "border-rose-200",
    skills: ["Patents", "Trademarks", "IP Litigation", "Licensing"],
  },
];

export default function Home() {
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          {/* Base Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* Overlaid Circles */}
          <svg
            className="absolute h-full w-full [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="circles-pattern"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(0.5)"
              >
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="stroke-gray-200/30 dark:stroke-gray-800/30"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circles-pattern)" />
          </svg>
        </div>

        <LayoutGroup>
          <div className="text-center">
            <Badge className="mb-4" variant="secondary">
              AI-Powered Resume Analysis
            </Badge>

            <motion.p className="flex flex-wrap justify-center text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <motion.span
                className="flex items-center"
                layout
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                Find your next&nbsp;
              </motion.span>
              <TextRotate
                texts={[
                  "legal role",
                  "frontend role",
                  "backend role",
                  "fullstack role",
                  "DevOps role",
                ]}
                mainClassName="px-3 bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400 overflow-hidden py-2 justify-center rounded-lg"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </motion.p>

            <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto">
              Smart resume analysis to match you with relevant opportunities
            </p>

            <div className="mt-10">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/analyze">
                  Upload Resume <Upload className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </LayoutGroup>
      </section>

      {/* Roles Grid */}
      <section ref={ref} className="py-20 px-4 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Explore Career Paths</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're in tech or law, we've got you covered with
                specialized role matching
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={cn(
                    "group relative p-6 rounded-2xl border bg-white",
                    "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                    "h-[280px] flex flex-col", // Fixed height and flex column
                    role.borderColor
                  )}
                >
                  {/* Top Section with Icon and Title */}
                  <div>
                    {/* Icon Circle */}
                    <div
                      className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center",
                        "transition-transform duration-500 group-hover:scale-110",
                        role.bgColor
                      )}
                    >
                      <role.icon className={cn("w-8 h-8", role.textColor)} />
                    </div>

                    <h3 className="text-xl font-semibold mt-6 mb-2">
                      {role.title}
                    </h3>
                    <p className="text-muted-foreground">{role.description}</p>
                  </div>

                  {/* Skills Tags - Always at Bottom */}
                  <div className="mt-auto pt-4">
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={cn(
                            "px-2 py-1 rounded-full text-xs whitespace-nowrap",
                            role.bgColor,
                            role.textColor
                          )}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Number */}
                  <div
                    className={cn(
                      "absolute -top-4 -right-4 w-8 h-8 rounded-full",
                      "flex items-center justify-center text-sm font-bold",
                      role.bgColor,
                      role.textColor
                    )}
                  >
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      <CTASection />

      <Footer />

      <Nametag />
    </main>
  );
}
