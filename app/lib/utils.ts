export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function validateFile(file: File) {
  const errors: string[] = [];

  // Check file type
  if (!file.type.includes("pdf")) {
    errors.push("Only PDF files are supported");
  }

  // Check file size (10MB max)
  if (file.size > 10 * 1024 * 1024) {
    errors.push("File size must be less than 10MB");
  }

  return errors;
}
