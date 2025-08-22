export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={`animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto ${className}`}
    />
  );
}

export function LoadingPage({
  message = "Loading, Please Wait ...",
}: {
  message?: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner className="mx-auto" />
        <p className="mt-6 font-medium text-lg text-gray-700">{message}</p>
      </div>
    </div>
  );
}
