import { NextResponse } from "next/server";
import PDFParser from "pdf2json";
import { z } from "zod";
import { HfInference } from "@huggingface/inference";
import { EnhancedResume, Resume } from "@/app/lib/types";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const ResumeSchema = z.object({
  personalInfo: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
  }),
  skills: z.object({
    legalDrafting: z.array(z.string()),
    corporateLaw: z.array(z.string()),
    compliance: z.array(z.string()),
    technical: z.array(z.string()),
    softSkills: z.array(z.string()),
  }),
  experience: z.array(
    z.object({
      role: z.string(),
      company: z.string(),
      team: z.string().optional(),
      duration: z.string(),
      responsibilities: z.array(z.string()),
      transactions: z
        .array(
          z.object({
            type: z.string(),
            value: z.string().optional(),
            description: z.string(),
          })
        )
        .optional(),
    })
  ),
  education: z.array(
    z.object({
      degree: z.string(),
      institution: z.string(),
      year: z.string(),
      score: z.string().optional(),
    })
  ),
  certifications: z.array(
    z.object({
      name: z.string(),
      issuer: z.string(),
      year: z.string().optional(),
    })
  ),
  publications: z.array(
    z.object({
      title: z.string(),
      journal: z.string(),
      year: z.string(),
      topic: z.string(),
    })
  ),
  achievements: z.array(
    z.object({
      category: z.string(),
      title: z.string(),
      organization: z.string(),
      year: z.string(),
    })
  ),
});

const SYSTEM_PROMPT = `You are a specialized legal resume parser. Extract detailed, structured information from legal resumes following this exact JSON format:

{
  "personalInfo": {
    "name": "full name",
    "email": "email address",
    "phone": "phone number"
  },
  "skills": {
    "legalDrafting": ["contract drafting", "agreement preparation", etc],
    "corporateLaw": ["M&A", "venture capital", etc],
    "compliance": ["regulatory compliance", "due diligence", etc],
    "technical": ["sector-specific skills", "technical knowledge"],
    "softSkills": ["negotiation", "client communication", etc]
  },
  "experience": [{
    "role": "exact job title",
    "company": "company name",
    "team": "specific team/department",
    "duration": "employment period",
    "responsibilities": ["detailed responsibilities"],
    "transactions": [{
      "type": "transaction type (M&A, VC, etc)",
      "value": "transaction value if mentioned",
      "description": "detailed description"
    }]
  }],
  "education": [{
    "degree": "full degree name",
    "institution": "institution name",
    "year": "graduation year",
    "score": "CGPA/percentage if mentioned"
  }],
  "certifications": [{
    "name": "certification name",
    "issuer": "issuing organization",
    "year": "year if mentioned"
  }],
  "publications": [{
    "title": "publication title",
    "journal": "journal name",
    "year": "publication year",
    "topic": "main subject area"
  }],
  "achievements": [{
    "category": "type (moot court/ADR/academic)",
    "title": "achievement title",
    "organization": "organizing body",
    "year": "year achieved"
  }]
}

Important instructions:
1. Extract EXACT text from the resume where possible
2. Categorize skills based on the context they appear in
3. For transactions, include deal values when mentioned
4. Parse all certifications and courses as formal certifications
5. Include moot court, ADR, and other legal competitions in achievements
6. For publications, identify the main legal domain/topic
7. Ensure all dates and names are exactly as they appear
8. Make the output valid JSON`;

export async function POST(request: Request) {
  try {
    console.log("1. Starting resume parsing process");
    const formData = await request.formData();
    const file = formData.get("file") as File;

    console.log("2. Received file:", {
      name: file?.name,
      type: file?.type,
      size: file?.size,
    });

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.includes("pdf")) {
      return NextResponse.json(
        { error: "Only PDF files are supported" },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    console.log("3. Converting file to buffer");
    const buffer = Buffer.from(await file.arrayBuffer());

    // Parse PDF to text
    console.log("4. Starting PDF parsing");
    const text = await parsePDF(buffer);
    console.log("5. PDF parsed successfully. Text length:", text.length);

    const processedText = preprocessText(text);

    // Use HuggingFace for text generation
    console.log("6. Starting HuggingFace request");

    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: `<s>[INST] ${SYSTEM_PROMPT}\n\nResume text:\n${processedText} [/INST]`,
      parameters: {
        max_new_tokens: 3000,
        temperature: 0.1,
        top_p: 0.95,
        return_full_text: false,
      },
    });

    console.log("7. Received HuggingFace response");

    // Clean the response to ensure it's valid JSON
    const jsonStr = cleanJsonResponse(response.generated_text);

    console.log("8. Parsing JSON response");
    const parsedData = JSON.parse(jsonStr);
    console.log("Parsed data:", parsedData);

    console.log("9. Validating against schema");
    const validatedData = ResumeSchema.parse(parsedData);
    console.log("10. Data validated successfully");

    // Enhance parsed data
    const enhancedData = enhanceParseResults(validatedData, text);
    console.log("Enhanced data:", enhancedData);

    return NextResponse.json({
      success: true,
      data: enhancedData,
    });
  } catch (error) {
    console.error("Resume parsing error:", {
      error:
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
              name: error.name,
            }
          : error,
      type: error?.constructor?.name,
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid resume format",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}

function parsePDF(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log("Starting PDF parsing function");
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      try {
        console.log("PDF parsing complete, processing pages");
        console.log("Number of pages:", pdfData.Pages.length);

        const text = pdfData.Pages.reduce((acc, page, index) => {
          console.log(`Processing page ${index + 1}`);
          console.log(`Number of text elements on page: ${page.Texts.length}`);

          const pageText = page.Texts.map((text) => {
            try {
              return decodeURIComponent(text.R[0].T);
            } catch (e) {
              console.error(`Error decoding text element:`, {
                raw: text.R[0].T,
                error: e,
              });
              return "";
            }
          }).join(" ");

          return acc + pageText;
        }, "");

        console.log("Text extraction complete");
        console.log("Total text length:", text.length);
        console.log("Sample of extracted text:", text.substring(0, 200));

        resolve(text);
      } catch (error) {
        console.error("Error in PDF text extraction:", {
          error:
            error instanceof Error
              ? {
                  message: error.message,
                  stack: error.stack,
                  name: error.name,
                }
              : error,
        });
        reject(new Error("Failed to process PDF content"));
      }
    });

    pdfParser.on("pdfParser_dataError", (error) => {
      console.error("PDF Parser error:", error);
      reject(error);
    });

    console.log("Starting buffer parse");
    pdfParser.parseBuffer(buffer);
  });
}

function preprocessText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/[^\x00-\x7F]/g, "") // Remove non-ASCII chars
    .trim();
}

function cleanJsonResponse(text: string): string {
  return text
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();
}

function calculateSectionConfidence(section: unknown): number {
  if (!section) return 0;

  // Calculate confidence based on completeness and data quality
  if (Array.isArray(section)) {
    return Math.min(1, section.length * 0.2); // More items = higher confidence
  }

  if (typeof section === "object" && section !== null) {
    const fields = Object.keys(section).length;
    const nonEmptyFields = Object.values(section).filter(
      (v) => v !== undefined && v !== null && v !== ""
    ).length;

    return nonEmptyFields / fields;
  }

  return 0;
}

function calculateOverallConfidence(resume: Resume): number {
  const weights = {
    personalInfo: 0.15,
    skills: 0.2,
    experience: 0.3,
    education: 0.15,
    certifications: 0.1,
    publications: 0.05,
    achievements: 0.05,
  };

  const sectionConfidences = {
    personalInfo: calculateSectionConfidence(resume.personalInfo),
    skills: calculateSectionConfidence(resume.skills),
    experience: calculateSectionConfidence(resume.experience),
    education: calculateSectionConfidence(resume.education),
    certifications: calculateSectionConfidence(resume.certifications),
    publications: calculateSectionConfidence(resume.publications),
    achievements: calculateSectionConfidence(resume.achievements),
  };

  const overallConfidence = Object.entries(weights).reduce(
    (acc, [key, weight]) =>
      acc + sectionConfidences[key as keyof typeof sectionConfidences] * weight,
    0
  );

  return Math.min(1, overallConfidence);
}

function enhanceParseResults(
  resume: Resume,
  originalText: string
): EnhancedResume {
  const confidence = calculateOverallConfidence(resume);
  const sectionConfidences = {
    personalInfo: calculateSectionConfidence(resume.personalInfo),
    skills: calculateSectionConfidence(resume.skills),
    experience: calculateSectionConfidence(resume.experience),
    education: calculateSectionConfidence(resume.education),
    certifications: calculateSectionConfidence(resume.certifications),
    publications: calculateSectionConfidence(resume.publications),
    achievements: calculateSectionConfidence(resume.achievements),
  };

  return {
    ...resume,
    metadata: {
      parsedAt: new Date().toISOString(),
      confidence: {
        overall: confidence,
        sections: sectionConfidences,
      },
      textLength: originalText.length,
    },
  };
}
