"use client";

import React, { useState, useEffect } from "react";
import { usePetDetails, useUpdatePet } from "../../_hooks";
import { PetStatus } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { LinksContainer, PetNotFound } from "../../_components";
import { PawPrint, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { isValidImageUrl } from "@/app/utils";
import { LoadingPage } from "@/components";

interface UpdatePetPageProps {
  params: {
    id: string;
  };
}

export default function UpdatePetPage({ params }: UpdatePetPageProps) {
  const { data: pet, isLoading } = usePetDetails(params.id);
  const {
    updatePet,
    updatePetImage,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdatePet();
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [status, setStatus] = useState<PetStatus>("available");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize form when pet data is loaded
  useEffect(() => {
    if (pet) {
      setName(pet.name || "");
      setStatus(pet.status);
      if (pet.photoUrls && pet.photoUrls[0] && pet.photoUrls[0] !== "string") {
        setImagePreview(pet.photoUrls[0]);
      }
    }
  }, [pet]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pet) return;

    try {
      const promises = [];

      // Check if pet details (name or status) have changed
      const detailsChanged = name !== pet.name || status !== pet.status;
      if (detailsChanged) {
        promises.push(
          updatePet({
            id: pet.id.toString(),
            name,
            status,
          })
        );
      }

      // Check if image has been updated
      if (imageFile) {
        promises.push(
          updatePetImage({
            id: pet.id.toString(),
            file: imageFile,
          })
        );
      }

      // Execute all updates in parallel if there are any changes
      if (promises.length > 0) {
        await Promise.all(promises);

        // Show success message and redirect to home
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      // Error handling is managed by React Query
      console.error("Update failed:", error);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!pet) {
    return <PetNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Success Message */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
          ✓ Pet updated successfully! Redirecting to home...
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <LinksContainer
            items={[
              { label: "Home", href: "/" },
              { label: "Pets", href: "/" },
              { label: pet.name || "Pet Details", href: `/pets/${pet.id}` },
              { label: "Update" },
            ]}
          />
        </div>

        {/* Update Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Update Pet: {pet.name}
          </h1>

          {/* Error Messages */}
          {!isUpdating && updateError && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {updateError.message}
            </div>
          )}

          {isUpdating && (
            <div className="mb-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-md">
              Updating pet...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Form Fields */}
              <div className="space-y-6">
                {/* Pet Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Pet Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter pet name"
                  />
                </div>

                {/* Pet Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as PetStatus)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>

                {/* Pet Image Upload */}
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Pet Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image"
                      className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                    >
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Click to upload a new image
                      </span>
                      <span className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </span>
                    </label>
                  </div>
                  {imageFile && (
                    <p className="mt-2 text-sm text-green-600">
                      Selected: {imageFile.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column - Image Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Image
                </label>
                <div className="border border-gray-300 rounded-md p-4">
                  {imagePreview &&
                  (isValidImageUrl(imagePreview) || imageFile) ? (
                    <div className="relative h-64 w-full">
                      <Image
                        src={imagePreview}
                        alt={pet.name || "Pet photo"}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="h-64 bg-gray-200 flex items-center justify-center rounded-md">
                      <PawPrint size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                href={`/pets/${pet.id}`}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isUpdating}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Update Pet"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
