// components/ui/loading-spinner.tsx
export function LoadingSpinner() {
  return (
    <div role="status" className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
