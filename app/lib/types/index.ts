import { z } from "zod";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  isRemote: boolean;
  url: string;
}

export interface SkillGap {
  resumeId: string;
  jobId: string;
  missingSkills: string[];
  matchPercentage: number;
  resources: {
    skill: string;
    type: "course" | "article" | "certification";
    links: string[];
  }[];
}

export interface ParsedResume {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
  };
  skills: {
    legalDrafting: string[];
    corporateLaw: string[];
    compliance: string[];
    technical: string[];
    softSkills: string[];
  };
  experience: {
    role: string;
    company: string;
    team?: string;
    duration: string;
    responsibilities: string[];
    transactions?: {
      type: string;
      value?: string;
      description: string;
    }[];
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
    score?: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    year?: string;
  }[];
  publications: {
    title: string;
    journal: string;
    year: string;
    topic: string;
  }[];
  achievements: {
    category: string;
    title: string;
    organization: string;
    year: string;
  }[];
  metadata?: {
    parsedAt: string;
    confidence: {
      overall: number;
      sections: {
        personalInfo: number;
        skills: number;
        experience: number;
        education: number;
        certifications: number;
        publications: number;
        achievements: number;
      };
    };
    textLength: number;
  };
}

export const PersonalInfoSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});

export const SkillsSchema = z.object({
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

export const ExperienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  team: z.string().optional(),
  duration: z.string(),
  responsibilities: z.array(z.string()),
  transactions: z.array(TransactionSchema).optional(),
});

export const EducationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  year: z.string(),
  score: z.string().optional(),
});

export const CertificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  year: z.string().optional(),
});

export const PublicationSchema = z.object({
  title: z.string(),
  journal: z.string(),
  year: z.string(),
  topic: z.string(),
});

export const AchievementSchema = z.object({
  category: z.string(),
  title: z.string(),
  organization: z.string(),
  year: z.string(),
});

export const ResumeSchema = z.object({
  personalInfo: PersonalInfoSchema,
  skills: SkillsSchema,
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  certifications: z.array(CertificationSchema),
  publications: z.array(PublicationSchema),
  achievements: z.array(AchievementSchema),
});

// Infer TypeScript types from Zod schemas
export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export type Skills = z.infer<typeof SkillsSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
export type Achievement = z.infer<typeof AchievementSchema>;
export type Resume = z.infer<typeof ResumeSchema>;

export interface EnhancedResume extends Resume {
  metadata: {
    parsedAt: string;
    confidence: {
      overall: number;
      sections: {
        personalInfo: number;
        skills: number;
        experience: number;
        education: number;
        certifications: number;
        publications: number;
        achievements: number;
      };
    };
    textLength: number;
  };
}
