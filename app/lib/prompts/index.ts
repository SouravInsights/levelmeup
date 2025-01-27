import {
  backendPrompt,
  frontendPrompt,
  devopsPrompt,
  fullstackPrompt,
} from "./engineering";
import { ipLawPrompt, corporateLawPrompt } from "./legal";
import { PromptConfig } from "./types";

type RoleCategory = "legal" | "engineering";

export const ROLE_PROMPTS: Record<
  RoleCategory,
  Record<string, PromptConfig>
> = {
  legal: {
    corporate: corporateLawPrompt,
    "intellectual-property": ipLawPrompt,
  },
  engineering: {
    frontend: frontendPrompt,
    backend: backendPrompt,
    fullstack: fullstackPrompt,
    devops: devopsPrompt,
  },
};

// Helper to validate skills based on role and type
export function getRequiredSkills(role: RoleCategory, type: string): string[] {
  return ROLE_PROMPTS[role][type]?.requiredFields || [];
}

// Helper to get prompt for specific role type
export function getRolePrompt(role: RoleCategory, type: string): string {
  return ROLE_PROMPTS[role][type]?.systemPrompt || "";
}

// Helper to get skill categories for a role
export function getSkillCategories(
  role: RoleCategory,
  type: string
): Record<string, string[]> {
  return ROLE_PROMPTS[role][type]?.skillCategories || {};
}
