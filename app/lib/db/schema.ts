// lib/db/schema.ts
import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  parsedData: jsonb("parsed_data").$type<{
    skills: string[];
    experience: Array<{
      role: string;
      company: string;
      duration: string;
      responsibilities: string[];
    }>;
    education: Array<{
      degree: string;
      institution: string;
      year: string;
    }>;
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location"),
  description: text("description"),
  requirements: jsonb("requirements").$type<string[]>(),
  isRemote: boolean("is_remote").default(false),
  url: text("url").notNull(),
  scrapedAt: timestamp("scraped_at").defaultNow(),
});

export const skillGaps = pgTable("skill_gaps", {
  id: serial("id").primaryKey(),
  resumeId: integer("resume_id").references(() => resumes.id),
  jobId: integer("job_id").references(() => jobs.id),
  missingSkills: jsonb("missing_skills").$type<string[]>(),
  matchPercentage: integer("match_percentage"),
  createdAt: timestamp("created_at").defaultNow(),
});
