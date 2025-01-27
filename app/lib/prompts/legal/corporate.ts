import { PromptConfig } from "../types";

export const corporateLawPrompt: PromptConfig = {
  systemPrompt: `You are a specialized corporate law resume parser. Focus on extracting:
  1. Corporate law expertise (M&A, venture capital, corporate governance)
  2. Transaction experience (deal sizes, types of transactions)
  3. Due diligence experience
  4. Regulatory compliance knowledge
  5. Commercial contract drafting experience`,
  skillCategories: {
    corporateTransactions: [
      "mergers and acquisitions",
      "venture capital",
      "private equity",
      "corporate restructuring",
    ],
    contractDrafting: [
      "commercial agreements",
      "shareholder agreements",
      "term sheets",
      "employment agreements",
    ],
    compliance: [
      "corporate governance",
      "regulatory compliance",
      "statutory compliance",
    ],
  },
  requiredFields: ["corporateTransactions", "contractDrafting"],
};
