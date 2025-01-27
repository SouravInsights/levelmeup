import { Parser } from "../base-parser";
import { corporateLawPrompt } from "../../prompts/legal/corporate";
import { LegalResumeSchema } from "../../types/legal";

export const corporateParser: Parser = {
  getSchema: () => LegalResumeSchema,
  getPromptConfig: () => corporateLawPrompt,
};
