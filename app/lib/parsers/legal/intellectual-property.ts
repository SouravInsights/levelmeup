import { Parser } from "../base-parser";
import { ipLawPrompt } from "../../prompts/legal/intellectual-property";
import { LegalResumeSchema } from "../../types/legal";

export const ipParser: Parser = {
  getSchema: () => LegalResumeSchema,
  getPromptConfig: () => ipLawPrompt,
};
