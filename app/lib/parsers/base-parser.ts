import { HfInference } from "@huggingface/inference";
import { z } from "zod";
import { PromptConfig } from "../prompts/types";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY!);

export interface Parser {
  getSchema: () => z.ZodSchema;
  getPromptConfig: () => PromptConfig;
}

export async function parseResume(text: string, parser: Parser) {
  const response = await hf.textGeneration({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    inputs: `<s>[INST] ${
      parser.getPromptConfig().systemPrompt
    }\n\nResume text:\n${text} [/INST]`,
    parameters: {
      max_new_tokens: 3000,
      temperature: 0.1,
      top_p: 0.95,
      return_full_text: false,
    },
  });

  const jsonStr = cleanJsonResponse(response.generated_text);
  const parsedData = JSON.parse(jsonStr);
  return parser.getSchema().parse(parsedData);
}

function cleanJsonResponse(text: string): string {
  return text
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();
}
