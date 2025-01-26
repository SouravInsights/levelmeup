import { ParsedResume } from "@/app/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Trophy,
  Calendar,
} from "lucide-react";

interface ParsedResumeViewProps {
  resume: ParsedResume;
}

export function ParsedResumeView({ resume }: ParsedResumeViewProps) {
  return (
    <div className="space-y-6">
      {/* Personal Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div>
              <span className="font-medium">Name:</span>{" "}
              {resume.personalInfo.name}
            </div>
            <div>
              <span className="font-medium">Email:</span>{" "}
              <a
                href={`mailto:${resume.personalInfo.email}`}
                className="text-blue-500 hover:underline"
              >
                {resume.personalInfo.email}
              </a>
            </div>
            <div>
              <span className="font-medium">Phone:</span>{" "}
              <a
                href={`tel:${resume.personalInfo.phone}`}
                className="text-blue-500 hover:underline"
              >
                {resume.personalInfo.phone}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Skills & Expertise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(resume.skills).map(([category, skills]) => (
              <div key={category}>
                <h4 className="text-sm font-medium mb-2 capitalize">
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Work Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {resume.experience.map((exp, i) => (
              <div
                key={i}
                className="border-l-2 border-muted pl-4 pb-6 last:pb-0"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">{exp.role}</h3>
                  {exp.team && <Badge variant="outline">{exp.team}</Badge>}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  <span>{exp.company}</span>
                  <span className="mx-2">•</span>
                  <span>{exp.duration}</span>
                </div>
                {exp.transactions && exp.transactions.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <h4 className="text-sm font-medium">Key Transactions</h4>
                    <div className="grid gap-2">
                      {exp.transactions.map((txn, j) => (
                        <div
                          key={j}
                          className="text-sm bg-muted/50 p-2 rounded-md"
                        >
                          <div className="font-medium">{txn.type}</div>
                          {txn.value && (
                            <div className="text-muted-foreground">
                              {txn.value}
                            </div>
                          )}
                          <div>{txn.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-3">
                  <h4 className="text-sm font-medium mb-2">Responsibilities</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {exp.responsibilities.map((resp, j) => (
                      <li key={j}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Other sections... */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resume.education.map((edu, i) => (
                <div key={i} className="border-l-2 border-muted pl-4">
                  <h3 className="font-medium">{edu.degree}</h3>
                  <div className="text-sm text-muted-foreground">
                    {edu.institution}
                  </div>
                  <div className="text-sm flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4" />
                    {edu.year}
                    {edu.score && <span>• {edu.score}</span>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Award className="h-5 w-5" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resume.certifications.map((cert, i) => (
                <div key={i}>
                  <h3 className="font-medium">{cert.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {cert.issuer}
                    {cert.year && <span> • {cert.year}</span>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Publications and Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Publications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resume.publications.map((pub, i) => (
                <div key={i}>
                  <h3 className="font-medium">{pub.title}</h3>
                  <div className="text-sm text-muted-foreground">
                    {pub.journal} • {pub.year}
                  </div>
                  <Badge variant="outline" className="mt-1">
                    {pub.topic}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resume.achievements.map((ach, i) => (
                <div key={i}>
                  <h3 className="font-medium">{ach.title}</h3>
                  <div className="text-sm text-muted-foreground">
                    {ach.organization} • {ach.year}
                  </div>
                  <Badge variant="outline" className="mt-1">
                    {ach.category}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
