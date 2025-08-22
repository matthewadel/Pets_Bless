import Link from "next/link";

export function PetNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Pet Not Found</h1>
        <Link
          href={"/"}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Back to Pet List
        </Link>
      </div>
    </div>
  );
}
