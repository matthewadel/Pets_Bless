"use client";

import React from "react";
import Image from "next/image";
import { Pet } from "@/types";
import { PawPrint } from "lucide-react";
import { useRouter } from "next/navigation";

interface PetCardProps {
  pet: Pet;
  onTagClick: (tagName: string) => void;
}

export function PetCard({ pet, onTagClick }: PetCardProps) {
  const petImage = pet.photoUrls?.[0];
  const router = useRouter();

  // Validate if the image URL is valid
  const isValidImageUrl = (url: string) => {
    if (!url || url === "string") return false;
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch {
      return false;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "sold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleNavigate = () => {
    // Store pet data in localStorage for the details page
    localStorage.setItem("selectedPet", JSON.stringify(pet));
    router.push(`/pets/${pet.id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative h-48 w-full bg-gray-200">
        {isValidImageUrl(petImage) ? (
          <Image
            src={petImage}
            alt={pet.name || "Pet"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PawPrint size={48} className="text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              pet.status
            )}`}
          >
            {pet.status}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 truncate">
          {pet.name || "Unnamed Pet"}
        </h3>

        {pet.category && (
          <p className="text-sm text-gray-600 mb-2">
            Category: {pet.category.name}
          </p>
        )}

        {pet.tags && pet.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {pet.tags.slice(0, 3).map((tag) => (
              <button
                key={tag.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Prevent event bubbling to parent div
                  onTagClick(tag.name);
                }}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full hover:bg-blue-200 transition-colors duration-200 cursor-pointer"
              >
                {tag.name}
              </button>
            ))}
            {pet.tags.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{pet.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
