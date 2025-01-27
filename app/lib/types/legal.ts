import { z } from "zod";
import {
  BasePersonalInfoSchema,
  BaseExperienceSchema,
  BaseEducationSchema,
  BaseCertificationSchema,
} from "./base";

export const LegalSkillsSchema = z.object({
  legalDrafting: z.array(z.string()),
  corporateLaw: z.array(z.string()),
  compliance: z.array(z.string()),
  technical: z.array(z.string()),
  softSkills: z.array(z.string()),
});

export const TransactionSchema = z.object({
  type: z.string(),
  value: z.string().optional(),
  description: z.string(),
});

export const LegalExperienceSchema = BaseExperienceSchema.extend({
  transactions: z.array(TransactionSchema).optional(),
});

export const PublicationSchema = z.object({
  title: z.string(),
  journal: z.string(),
  year: z.string(),
  topic: z.string(),
});

export const LegalAchievementSchema = z.object({
  category: z.string(), // e.g., "moot court", "ADR", "academic"
  title: z.string(),
  organization: z.string(),
  year: z.string(),
});

export const LegalResumeSchema = z.object({
  role: z.literal("legal"),
  personalInfo: BasePersonalInfoSchema,
  skills: LegalSkillsSchema,
  experience: z.array(LegalExperienceSchema),
  education: z.array(BaseEducationSchema),
  certifications: z.array(BaseCertificationSchema),
  publications: z.array(PublicationSchema),
  achievements: z.array(LegalAchievementSchema),
});

export type LegalSkills = z.infer<typeof LegalSkillsSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type LegalExperience = z.infer<typeof LegalExperienceSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
export type LegalAchievement = z.infer<typeof LegalAchievementSchema>;
export type LegalResume = z.infer<typeof LegalResumeSchema>;
