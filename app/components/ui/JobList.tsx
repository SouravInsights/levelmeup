"use client";

import { Job, ParsedResume } from "@/app/lib/types";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building } from "lucide-react";

interface JobListProps {
  parsedResume?: ParsedResume;
}

export function JobList({ parsedResume }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();
        setJobs(data.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (isLoading) {
    return <JobListSkeleton />;
  }

  return (
    <div className="grid gap-6">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          matchScore={calculateMatchScore(job, parsedResume)}
        />
      ))}
    </div>
  );
}

interface JobCardProps {
  job: Job;
  matchScore: number;
}

function JobCard({ job, matchScore }: JobCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Building className="h-4 w-4" />
              {job.company}
              <span className="mx-1">•</span>
              <MapPin className="h-4 w-4" />
              {job.location}
              {job.isRemote && (
                <>
                  <span className="mx-1">•</span>
                  <Badge>Remote</Badge>
                </>
              )}
            </CardDescription>
          </div>
          <Badge
            variant={matchScore > 80 ? "default" : "secondary"}
            className="ml-2"
          >
            {matchScore}% Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Requirements</h4>
            <div className="flex flex-wrap gap-2">
              {job.requirements.map((req, i) => (
                <Badge key={i} variant="outline">
                  {req}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            {job.salary && (
              <div className="text-sm text-muted-foreground">{job.salary}</div>
            )}
            <Button asChild>
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                View Job
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function JobListSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <div className="h-6 bg-muted rounded w-2/3 animate-pulse" />
            <div className="h-4 bg-muted rounded w-1/2 mt-2 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full animate-pulse" />
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function calculateMatchScore(job: Job, resume?: ParsedResume): number {
  if (!resume) return 0;

  // Flatten all skills from resume
  const resumeSkills = Object.values(resume.skills).flat();

  // Count matching requirements
  const matchingReqs = job.requirements.filter((req) =>
    resumeSkills.some((skill) =>
      req.toLowerCase().includes(skill.toLowerCase())
    )
  );

  return Math.round((matchingReqs.length / job.requirements.length) * 100);
}
