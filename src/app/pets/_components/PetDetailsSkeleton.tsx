export function PetDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back button skeleton */}
        <div className="mb-6">
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image skeleton */}
            <div className="md:w-1/2">
              <div className="h-96 bg-gray-200 animate-pulse"></div>
            </div>

            {/* Content skeleton */}
            <div className="md:w-1/2 p-8">
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-1/2"></div>

              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
              </div>

              <div className="mt-6 flex gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
