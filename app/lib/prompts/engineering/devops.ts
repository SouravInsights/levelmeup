import { PromptConfig } from "../types";

export const devopsPrompt: PromptConfig = {
  systemPrompt: `You are specialized in parsing DevOps engineering resumes. Focus on:
  1. Infrastructure automation
  2. CI/CD pipeline design
  3. Cloud platforms expertise
  4. Monitoring and observability
  5. Security and compliance`,
  skillCategories: {
    infrastructure: ["Terraform", "CloudFormation", "Pulumi"],
    containerization: ["Docker", "Kubernetes", "ECS"],
    cicd: ["Jenkins", "GitHub Actions", "GitLab CI", "ArgoCD"],
    monitoring: ["Prometheus", "Grafana", "ELK Stack", "Datadog"],
    security: [
      "HashiCorp Vault",
      "AWS IAM",
      "Security Scanning",
      "Compliance Automation",
    ],
  },
  requiredFields: ["infrastructure", "containerization", "cicd"],
};
