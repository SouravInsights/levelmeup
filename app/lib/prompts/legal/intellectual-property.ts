import { PromptConfig } from "../types";

export const ipLawPrompt: PromptConfig = {
  systemPrompt: `You are specialized in parsing IP law resumes. Focus on:
      1. Patent prosecution and litigation
      2. Trademark portfolio management
      3. IP licensing and transactions
      4. Copyright law expertise
      5. Technology transfer experience`,
  skillCategories: {
    patentLaw: ["patent prosecution", "patent litigation", "patent portfolio"],
    trademarkLaw: [
      "trademark registration",
      "portfolio management",
      "brand protection",
    ],
    ipTransactions: ["licensing", "technology transfer", "IP due diligence"],
  },
  requiredFields: ["patentLaw", "ipTransactions"],
};
