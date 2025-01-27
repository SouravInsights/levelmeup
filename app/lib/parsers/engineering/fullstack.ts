import { Parser } from "../base-parser";
import { fullstackPrompt } from "../../prompts/engineering/fullstack";
import { FullstackResumeSchema } from "../../types/engineering";

export const fullstackParser: Parser = {
  getSchema: () => FullstackResumeSchema,
  getPromptConfig: () => fullstackPrompt,
};
