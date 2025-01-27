export function detectRole(text: string): string {
  const textLower = text.toLowerCase();

  const roleIndicators = {
    frontend: [
      "react",
      "vue",
      "angular",
      "css",
      "html",
      "frontend",
      "ui",
      "ux",
      "javascript",
      "typescript",
    ],
    backend: [
      "nodejs",
      "python",
      "java",
      "api",
      "database",
      "backend",
      "sql",
      "microservices",
      "aws",
      "cloud",
    ],
    fullstack: [
      "fullstack",
      "full stack",
      "full-stack",
      "mern",
      "mean",
      "frontend",
      "backend",
    ],
    "legal-corporate": [
      "corporate law",
      "m&a",
      "venture capital",
      "contracts",
      "due diligence",
      "compliance",
      "regulatory",
    ],
    "legal-ip": [
      "intellectual property",
      "patent",
      "trademark",
      "copyright",
      "licensing",
      "ip litigation",
    ],
  } as const;

  // Count matches for each role
  const matches = Object.entries(roleIndicators).map(([role, indicators]) => ({
    role,
    count: indicators.filter((indicator) => textLower.includes(indicator))
      .length,
  }));

  // Return the role with most matches
  const bestMatch = matches.reduce((prev, current) =>
    current.count > prev.count ? current : prev
  );

  return bestMatch.count > 0 ? bestMatch.role : "general";
}
