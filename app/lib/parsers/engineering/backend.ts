import { Parser } from "../base-parser";
import { backendPrompt } from "../../prompts/engineering/backend";
import { BackendResumeSchema } from "../../types/engineering";

export const backendParser: Parser = {
  getSchema: () => BackendResumeSchema,
  getPromptConfig: () => backendPrompt,
};
