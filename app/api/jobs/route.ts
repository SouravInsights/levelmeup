import { NextResponse } from "next/server";
import FirecrawlApp from "@mendable/firecrawl-js";
import { JobListing } from "@/app/lib/types";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY!,
});

const jobBoards = [
  // Legal-specific job boards
  "https://www.flexjobs.com/search?search=legal+counsel",
  "https://www.remote.co/remote-jobs/legal",
  "https://www.remoterocketship.com/country/india/jobs/legal",
  "https://builtin.com/jobs/remote/legal",
  "https://himalayas.app/jobs/legal",
  "https://web3.career/legal+remote-jobs",
  "https://startup.jobs/roles/legal",
  "https://in.indeed.com/q-general-corporate-law-jobs.html",
  "https://cutshort.io/jobs/legal-jobs",
  "https://www.axiomlaw.com/careers/lawyers/available-positions",
];

export async function GET() {
  try {
    console.log("1. Starting job extraction");
    console.log("Job boards to scrape:", jobBoards);

    const jobSchema = {
      type: "object",
      properties: {
        title: { type: "string" },
        company: { type: "string" },
        location: { type: "string" },
        isRemote: { type: "boolean" },
        description: { type: "string" },
        requirements: {
          type: "array",
          items: { type: "string" },
        },
        responsibilities: {
          type: "array",
          items: { type: "string" },
        },
        salary: { type: "string" },
        postedDate: { type: "string" },
        employmentType: { type: "string" },
        experienceLevel: { type: "string" },
        url: { type: "string" },
      },
    };

    console.log("2. Making Firecrawl extract request");
    const response = await firecrawl.extract(jobBoards, {
      prompt: `Extract remote or india based legal job opportunities focusing on general corporate, Mergers and Acquisitions, and venture capital positions.`,
      schema: jobSchema,
    });

    console.log("3. Firecrawl response:", response);

    if (!response.success) {
      console.error("4. Extraction failed:", response);
      throw new Error("Job extraction failed");
    }

    const jobsArray = Array.isArray(response.data)
      ? response.data
      : [response.data];

    console.log("5. Starting job filtering");

    // Process and filter jobs
    const jobs = jobsArray
      .filter((job: JobListing) => {
        const jobText = `${job.title} ${job.description}`.toLowerCase();
        return (
          jobText.includes("legal") ||
          jobText.includes("lawyer") ||
          jobText.includes("counsel")
        );
      })
      .map((job: JobListing) => ({
        ...job,
        requirements: Array.isArray(job.requirements) ? job.requirements : [],
        responsibilities: Array.isArray(job.responsibilities)
          ? job.responsibilities
          : [],
        description: job.description?.replace(/<[^>]*>/g, "").trim() || "",
        isRemote:
          job.isRemote ||
          job.location?.toLowerCase().includes("remote") ||
          false,
      }));

    console.log("7. Final filtered jobs count:", jobs.length);
    console.log("8. Sample of jobs:", jobs.slice(0, 2));

    return NextResponse.json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("Error details:", error);

    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
