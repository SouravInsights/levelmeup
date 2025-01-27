import { z } from "zod";

export const BasePersonalInfoSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string().optional(),
  links: z.array(z.string()).optional(),
});

export const BaseExperienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  duration: z.string(),
  location: z.string().optional(),
  responsibilities: z.array(z.string()),
});

export const BaseEducationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  year: z.string(),
  score: z.string().optional(),
});

export const BaseCertificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  year: z.string().optional(),
});

export type BasePersonalInfo = z.infer<typeof BasePersonalInfoSchema>;
export type BaseExperience = z.infer<typeof BaseExperienceSchema>;
export type BaseEducation = z.infer<typeof BaseEducationSchema>;
export type BaseCertification = z.infer<typeof BaseCertificationSchema>;
