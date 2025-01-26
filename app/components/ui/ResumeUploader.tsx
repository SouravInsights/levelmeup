"use client";

import { useState } from "react";
import { Upload, X, File, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { ParsedResume } from "@/app/lib/types";

export function ResumeUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const { toast } = useToast();

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.[0]) return;

    const file = event.target.files[0];

    // Validate file type
    if (!file.type.includes("pdf")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    setFile(file);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      console.log("parsed response data:", data.data);

      if (data.success) {
        setParsedResume(data.data);
        toast({
          title: "Resume parsed successfully",
          description: "Your resume has been analyzed",
        });
      } else {
        throw new Error(data.error || "Failed to parse resume");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to parse resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }

  function handleRemoveFile() {
    setFile(null);
    setParsedResume(null);
  }

  // Transform skills object into an array of { category, skills } for rendering
  const skillsArray = parsedResume
    ? Object.entries(parsedResume.skills).map(([category, skills]) => ({
        category,
        skills,
      }))
    : [];

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center">
        {!file ? (
          <div className="w-full max-w-md">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-muted-foreground">PDF (MAX. 10MB)</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <File className="w-8 h-8 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(file.size / 1024)} KB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                disabled={isUploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {parsedResume && (
              <div className="mt-6 space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Info</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {parsedResume.personalInfo.name}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {parsedResume.personalInfo.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {parsedResume.personalInfo.phone}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Skills</h3>
                  <div className="space-y-4">
                    {skillsArray.map(({ category, skills }, index) => (
                      <div key={index}>
                        <h4 className="text-sm font-medium mb-2">
                          {category.replace(/([A-Z])/g, " $1").trim()}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-2 py-1 bg-primary/10 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Experience</h3>
                  <div className="space-y-4">
                    {parsedResume.experience.map((exp, index) => (
                      <div key={index} className="space-y-2">
                        <p className="font-medium">
                          {exp.role} at {exp.company}
                        </p>
                        <p className="text-muted-foreground">{exp.duration}</p>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">
                            Responsibilities
                          </h4>
                          <ul className="list-disc list-inside text-sm">
                            {exp.responsibilities.map((resp, respIndex) => (
                              <li key={respIndex}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Transactions</h4>
                          <ul className="space-y-2">
                            {exp.transactions?.map((txn, txnIndex) => (
                              <li key={txnIndex} className="text-sm">
                                <p className="font-medium">{txn.type}</p>
                                <p className="text-muted-foreground">
                                  {txn.value}
                                </p>
                                <p>{txn.description}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Education</h3>
                  <div className="space-y-4">
                    {parsedResume.education.map((edu, index) => (
                      <div key={index} className="space-y-1">
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-muted-foreground">
                          {edu.institution} ({edu.year})
                        </p>
                        <p>{edu.score}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                  <div className="space-y-4">
                    {parsedResume.certifications.map((cert, index) => (
                      <div key={index} className="space-y-1">
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-muted-foreground">
                          {cert.issuer} ({cert.year})
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Publications */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Publications</h3>
                  <div className="space-y-4">
                    {parsedResume.publications.map((pub, index) => (
                      <div key={index} className="space-y-1">
                        <p className="font-medium">{pub.title}</p>
                        <p className="text-muted-foreground">
                          {pub.journal} ({pub.year})
                        </p>
                        <p>Topic: {pub.topic}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                  <div className="space-y-4">
                    {parsedResume.achievements.map((ach, index) => (
                      <div key={index} className="space-y-1">
                        <p className="font-medium">{ach.title}</p>
                        <p className="text-muted-foreground">
                          {ach.organization} ({ach.year})
                        </p>
                        <p>Category: {ach.category}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {isUploading && (
          <div className="mt-4 flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Processing resume...</span>
          </div>
        )}
      </div>
    </Card>
  );
}
