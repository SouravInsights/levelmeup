import { Parser } from "../base-parser";
import { frontendPrompt } from "../../prompts/engineering/frontend";
import { FrontendResumeSchema } from "../../types/engineering";

export const frontendParser: Parser = {
  getSchema: () => FrontendResumeSchema,
  getPromptConfig: () => frontendPrompt,
};
