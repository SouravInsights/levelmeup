"use client";

import { useState } from "react";
import { ResumeUploader } from "@/app/components/ui/ResumeUploader";
import { JobList } from "@/app/components/ui/JobList";
import { ParsedResume } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ParsedResumeView } from "../components/ui/ParsedResumeView";

export default function AnalyzePage() {
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);

  return (
    <div className="min-h-screen py-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {parsedResume ? (
          <>
            <div className="flex items-center mb-8">
              <Button
                variant="ghost"
                className="mr-4"
                onClick={() => setParsedResume(null)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold">Results</h1>
            </div>
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Your Parsed Resume
                </h2>
                <ParsedResumeView resume={parsedResume} />
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Matching Job Opportunities
                </h2>
                <JobList parsedResume={parsedResume} />
              </section>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-8">
              Upload Your Resume
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              Upload your resume to find matching remote opportunities and get
              personalized career insights.
            </p>
            <ResumeUploader onParsed={setParsedResume} />
          </>
        )}
      </div>
    </div>
  );
}
