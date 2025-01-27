/* eslint-disable react/no-unescaped-entities */

// app/page.tsx
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

const roles = [
  {
    icon: Code2,
    title: "Frontend Engineer",
    description: "React • Vue • Angular • UI/UX • Web Performance",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Server,
    title: "Backend Engineer",
    description: "APIs • Databases • System Design • Cloud",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Laptop,
    title: "Fullstack Engineer",
    description: "End-to-end Development • Full Application Lifecycle",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: CloudCog,
    title: "DevOps Engineer",
    description: "CI/CD • Infrastructure • Cloud • Monitoring",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Scale,
    title: "Corporate Lawyer",
    description: "M&A • Venture Capital • Compliance • Due Diligence",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Briefcase,
    title: "IP Lawyer",
    description: "Patents • Trademarks • IP Litigation • Licensing",
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
  },
];

export default function Home() {
  const { ref, inView } = useInView({
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
      <section ref={ref} className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Specialized Role Support
            </h2>
            <p className="text-xl text-muted-foreground">
              Smart parsing and matching for various tech and legal roles
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`h-[200px] p-6 rounded-xl border bg-card ${role.bgColor} flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200`}
                >
                  <div>
                    <role.icon className={`h-12 w-12 ${role.color}`} />
                    <h3 className="mt-4 text-xl font-semibold">{role.title}</h3>
                  </div>
                  <p className="mt-2 text-muted-foreground text-sm">
                    {role.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
