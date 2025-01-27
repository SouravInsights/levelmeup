export interface PromptConfig {
  systemPrompt: string;
  skillCategories: Record<string, string[]>;
  requiredFields: string[];
  experienceFormat?: {
    sections: string[];
    required: string[];
  };
}
