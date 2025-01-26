"use client";

import { useState } from "react";
import { Upload, X, File, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { ParsedResume } from "@/app/lib/types";
import { ParsedResumeView } from "./ParsedResumeView";

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

  // // Transform skills object into an array of { category, skills } for rendering
  // const skillsArray = parsedResume
  //   ? Object.entries(parsedResume.skills).map(([category, skills]) => ({
  //       category,
  //       skills,
  //     }))
  //   : [];

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
              <div className="mt-6">
                <ParsedResumeView resume={parsedResume} />
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
