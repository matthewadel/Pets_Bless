"use client";

import React from "react";
import { usePetDetails } from "../_hooks";
import { Pet } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb, PetDetailsSkeleton } from "../_components";
import { PawPrint } from "lucide-react";

interface PetDetailsPageProps {
  params: {
    id: string;
  };
}

export default function PetDetailsPage({ params }: PetDetailsPageProps) {
  const { data: pet, isLoading } = usePetDetails(params.id);
  const [cachedPet, setCachedPet] = React.useState<Pet | null>(null);

  // Get cached pet data from localStorage when component mounts
  React.useEffect(() => {
    const storedPet = localStorage.getItem("selectedPet");
    if (storedPet) {
      try {
        const parsedPet = JSON.parse(storedPet);
        // Verify it's the same pet by ID
        if (parsedPet.id === parseInt(params.id)) {
          setCachedPet(parsedPet);
        }
      } catch (error) {
        console.error("Error parsing cached pet data:", error);
      }
    }
  }, [params.id]);

  // Use useMemo to prevent infinite re-renders by stabilizing the object reference
  const displayPet = React.useMemo(() => {
    return pet || cachedPet;
  }, [pet, cachedPet]);

  const isValidImageUrl = (url: string) => {
    if (!url || url === "string") return false;
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch {
      return false;
    }
  };

  const statusColors = {
    available: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    sold: "bg-red-100 text-red-800",
  };

  if (isLoading && !displayPet) {
    return <PetDetailsSkeleton />;
  }

  if (!displayPet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Pet Not Found
          </h1>
          <Link
            href="/pets"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Pet List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Pets", href: "/pets" },
              { label: displayPet.name || "Pet Details" },
            ]}
          />
        </div>

        {/* Pet details card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Pet image */}
            <div className="md:w-1/2">
              {isValidImageUrl(displayPet.photoUrls?.[0]) ? (
                <div className="relative h-96 md:h-full">
                  <Image
                    src={displayPet.photoUrls?.[0]}
                    alt={displayPet.name || "Pet photo"}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className=" bg-gray-200 w-full h-full flex items-center justify-center">
                  <PawPrint size={48} className="text-gray-400" />
                </div>
              )}
            </div>

            {/* Pet information */}
            <div className="md:w-1/2 p-8">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {displayPet.name || "Unnamed Pet"}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusColors[displayPet.status] ||
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {displayPet.status}
                </span>
              </div>

              {/* Pet ID */}
              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  Pet ID: {displayPet.id}
                </span>
              </div>

              {/* Category */}
              {displayPet.category?.name && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    Category
                  </h3>
                  <p className="text-gray-600">{displayPet.category.name}</p>
                </div>
              )}

              {/* Tags */}
              {displayPet.tags && displayPet.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {displayPet.tags.map((tag, index) => (
                      <span
                        key={tag.id || index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
