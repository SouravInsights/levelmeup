import { PromptConfig } from "../types";

export const fullstackPrompt: PromptConfig = {
  systemPrompt: `You are specialized in parsing fullstack engineering resumes. Focus on:
  1. End-to-end application development
  2. Full application lifecycle
  3. Database and API design
  4. Frontend and Backend expertise
  5. DevOps and deployment experience`,
  skillCategories: {
    frontend: ["React", "Vue", "Angular", "Next.js"],
    backend: ["Node.js", "Python", "Go", "Java"],
    databases: ["PostgreSQL", "MongoDB", "Redis"],
    devops: ["Docker", "AWS", "CI/CD", "Monitoring"],
    architecture: ["Microservices", "Serverless", "System Design"],
  },
  requiredFields: ["frontend", "backend", "databases"],
};
