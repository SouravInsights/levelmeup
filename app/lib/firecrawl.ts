import FirecrawlApp from "@mendable/firecrawl-js";

export const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY!,
});

export async function scrapeJobs(urls: string[]) {
  try {
    const batchScrapeResponse = await firecrawl.batchScrapeUrls(urls, {
      formats: ["json"],
      jsonOptions: {
        prompt:
          "Extract job details including title, company, location, requirements, and whether it's remote. Focus on legal and corporate law positions.",
        schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            company: { type: "string" },
            location: { type: "string" },
            requirements: { type: "array", items: { type: "string" } },
            remote: { type: "boolean" },
          },
        },
      },
    });

    if (!batchScrapeResponse.success) {
      throw new Error(`Failed to scrape jobs: ${batchScrapeResponse.error}`);
    }

    return batchScrapeResponse.data;
  } catch (error) {
    console.error("Job scraping failed:", error);
    throw error;
  }
}
