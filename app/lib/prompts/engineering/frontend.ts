import { PromptConfig } from "../types";

export const frontendPrompt: PromptConfig = {
  systemPrompt: `You are specialized in parsing frontend engineering resumes. Focus on:
      1. UI/UX implementation experience
      2. Frontend frameworks expertise
      3. State management experience
      4. Performance optimization
      5. Browser APIs and web standards knowledge`,
  skillCategories: {
    frameworks: ["React", "Vue", "Angular", "Next.js", "Remix"],
    styling: ["CSS", "Sass", "Tailwind", "CSS-in-JS", "PostCSS"],
    stateManagement: ["Redux", "MobX", "Zustand", "Jotai", "XState"],
    testing: ["Jest", "Testing Library", "Cypress", "Playwright"],
    buildTools: ["Webpack", "Vite", "Rollup", "esbuild"],
  },
  requiredFields: ["frameworks", "stateManagement"],
};
