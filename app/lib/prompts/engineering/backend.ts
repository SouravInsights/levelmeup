import { PromptConfig } from "../types";

export const backendPrompt: PromptConfig = {
  systemPrompt: `You are specialized in parsing backend engineering resumes. Focus on:
      1. API design and implementation
      2. Database design and optimization
      3. System architecture
      4. Scalability and performance
      5. Security best practices`,
  skillCategories: {
    languages: ["Node.js", "Python", "Go", "Java", "Rust"],
    databases: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
    apis: ["REST", "GraphQL", "gRPC", "WebSockets"],
    infrastructure: ["Docker", "Kubernetes", "AWS", "GCP", "Azure"],
    messaging: ["RabbitMQ", "Kafka", "Redis Pub/Sub"],
  },
  requiredFields: ["languages", "databases", "apis"],
};
