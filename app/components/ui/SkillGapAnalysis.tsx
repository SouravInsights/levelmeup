"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SkillGap } from "@/app/lib/types";

interface SkillGapAnalysisProps {
  skillGap: SkillGap;
}

export function SkillGapAnalysis({ skillGap }: SkillGapAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Gap Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Match Score</span>
              <span className="text-sm text-muted-foreground">
                {skillGap.matchPercentage}%
              </span>
            </div>
            <Progress value={skillGap.matchPercentage} />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Missing Skills</h3>
            <div className="grid grid-cols-2 gap-2">
              {skillGap.missingSkills.map((skill) => (
                <div key={skill} className="text-sm p-2 bg-muted rounded-md">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {skillGap.resources.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">
                Recommended Resources
              </h3>
              <div className="space-y-2">
                {skillGap.resources.map((resource, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="font-medium">{resource.skill}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {resource.type}
                      </div>
                      <a
                        href={resource.links[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline mt-1 block"
                      >
                        Learn More
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
