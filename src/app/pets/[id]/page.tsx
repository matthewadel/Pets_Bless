"use client";

import React from "react";
import { usePetDetails } from "../_hooks";
import Link from "next/link";
import Image from "next/image";
import {
  LinksContainer,
  PetDetailsSkeleton,
  PetNotFound,
} from "../_components";
import { PawPrint } from "lucide-react";
import { isValidImageUrl } from "@/app/utils";

interface PetDetailsPageProps {
  params: {
    id: string;
  };
}

export default function PetDetailsPage({ params }: PetDetailsPageProps) {
  const { data: pet, isLoading } = usePetDetails(params.id);

  const statusColors = {
    available: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    sold: "bg-red-100 text-red-800",
  };

  if (isLoading && !pet) {
    return <PetDetailsSkeleton />;
  }

  if (!pet) {
    return <PetNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <LinksContainer
            items={[
              { label: "Home", href: "/" },
              { label: "Pets", href: "/" },
              { label: pet.name || "Pet Details" },
            ]}
          />
        </div>

        {/* Pet details card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Pet image */}
            <div className="md:w-1/2">
              {isValidImageUrl(pet.photoUrls?.[0]) ? (
                <div className="relative h-96 md:h-full">
                  <Image
                    src={pet.photoUrls?.[0]}
                    alt={pet.name || "Pet photo"}
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
                  {pet.name || "Unnamed Pet"}
                </h1>
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusColors[pet.status as keyof typeof statusColors] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {pet.status}
                  </span>
                  <Link
                    href={`/pets/${pet.id}/update`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
                  >
                    Update Pet
                  </Link>
                </div>
              </div>

              {/* Pet ID */}
              <div className="mb-4">
                <span className="text-sm text-gray-500">Pet ID: {pet.id}</span>
              </div>

              {/* Category */}
              {pet.category?.name && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    Category
                  </h3>
                  <p className="text-gray-600">{pet.category.name}</p>
                </div>
              )}

              {/* Tags */}
              {pet.tags && pet.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pet.tags.map(
                      (tag: { id: number; name: string }, index: number) => (
                        <span
                          key={tag.id || index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                        >
                          {tag.name}
                        </span>
                      )
                    )}
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
