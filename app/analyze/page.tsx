import { ResumeUploader } from "@/app/components/ui/ResumeUploader";

export default function AnalyzePage() {
  return (
    <div className="min-h-screen py-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Upload Your Legal Resume
        </h1>
        <ResumeUploader />
      </div>
    </div>
  );
}
