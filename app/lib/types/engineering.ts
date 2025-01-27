import { z } from "zod";
import {
  BasePersonalInfoSchema,
  BaseExperienceSchema,
  BaseEducationSchema,
  BaseCertificationSchema,
} from "./base";

const BaseEngineeringSkillsSchema = z.object({
  languages: z.array(z.string()),
  frameworks: z.array(z.string()),
  tools: z.array(z.string()),
  softSkills: z.array(z.string()),
});

export const FrontendSkillsSchema = BaseEngineeringSkillsSchema.extend({
  styling: z.array(z.string()),
  testing: z.array(z.string()),
});

export const BackendSkillsSchema = BaseEngineeringSkillsSchema.extend({
  databases: z.array(z.string()),
  cloud: z.array(z.string()),
  api: z.array(z.string()),
});

export const FullstackSkillsSchema = z.object({
  frontend: FrontendSkillsSchema,
  backend: BackendSkillsSchema,
  devops: z.array(z.string()).optional(),
});

export const ProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  url: z.string().optional(),
  highlights: z.array(z.string()),
});

export const EngineeringExperienceSchema = BaseExperienceSchema.extend({
  projects: z.array(ProjectSchema).optional(),
});

// Role-specific Resume Schemas
export const FrontendResumeSchema = z.object({
  role: z.literal("frontend"),
  personalInfo: BasePersonalInfoSchema,
  skills: FrontendSkillsSchema,
  experience: z.array(EngineeringExperienceSchema),
  education: z.array(BaseEducationSchema),
  certifications: z.array(BaseCertificationSchema),
  projects: z.array(ProjectSchema),
});

export const BackendResumeSchema = z.object({
  role: z.literal("backend"),
  personalInfo: BasePersonalInfoSchema,
  skills: BackendSkillsSchema,
  experience: z.array(EngineeringExperienceSchema),
  education: z.array(BaseEducationSchema),
  certifications: z.array(BaseCertificationSchema),
  projects: z.array(ProjectSchema),
});

export const FullstackResumeSchema = z.object({
  role: z.literal("fullstack"),
  personalInfo: BasePersonalInfoSchema,
  skills: FullstackSkillsSchema,
  experience: z.array(EngineeringExperienceSchema),
  education: z.array(BaseEducationSchema),
  certifications: z.array(BaseCertificationSchema),
  projects: z.array(ProjectSchema),
});

export type BaseEngineeringSkills = z.infer<typeof BaseEngineeringSkillsSchema>;
export type FrontendSkills = z.infer<typeof FrontendSkillsSchema>;
export type BackendSkills = z.infer<typeof BackendSkillsSchema>;
export type FullstackSkills = z.infer<typeof FullstackSkillsSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type EngineeringExperience = z.infer<typeof EngineeringExperienceSchema>;

export type FrontendResume = z.infer<typeof FrontendResumeSchema>;
export type BackendResume = z.infer<typeof BackendResumeSchema>;
export type FullstackResume = z.infer<typeof FullstackResumeSchema>;
