"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { usePets } from "./_hooks";
import { PetStatus, Pet } from "@/types";
import { PetCard, StatusToggle, SearchInput, LoadingGrid } from "./_components";
import { useAuth } from "@/providers/auth-provider";
import { Frown } from "lucide-react";

export default function PetsPage() {
  const [status, setStatus] = useState<PetStatus>("available");
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [visiblePages, setVisiblePages] = useState(1); // How many pages to show

  const { user, logout } = useAuth();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Reset visible pages when filters change
  useEffect(() => {
    setVisiblePages(1);
  }, [status, debouncedSearch, selectedTag]);

  const { data, isLoading, isError, error } = usePets(
    status,
    debouncedSearch,
    selectedTag
  );

  const handleTagClick = useCallback((tagName: string) => {
    setSelectedTag(tagName);
    setSearch(""); // Clear search when filtering by tag
  }, []);

  const handleStatusChange = useCallback((newStatus: PetStatus) => {
    setStatus(newStatus);
  }, []);

  const handleSearchChange = useCallback((newSearch: string) => {
    setSearch(newSearch);
    setSelectedTag(""); // Clear tag filter when searching by name
  }, []);

  // Simulate infinite scroll by showing more pages
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        const totalPages = data?.pages.length || 0;
        if (visiblePages < totalPages) {
          setVisiblePages((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visiblePages, data?.pages.length]);

  // Get pets from visible pages only - memoized to prevent unnecessary re-renders
  const allPets = useMemo(() => {
    return (
      data?.pages.slice(0, visiblePages).flatMap((page) => page.pets) || []
    );
  }, [data?.pages, visiblePages]);

  const totalCount = data?.totalCount ?? 0;
  const totalPages = data?.pages.length || 0;
  const hasMorePages = visiblePages < totalPages;

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Pets
          </h1>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pet Store</h1>
            <p className="text-gray-600">
              Discover amazing pets looking for their forever homes
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            )}
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchInput value={search} onChange={handleSearchChange} />
            </div>
            <div className="sm:w-80">
              <StatusToggle
                currentStatus={status}
                onStatusChange={handleStatusChange}
              />
            </div>
          </div>

          {/* Selected tag filter */}
          {selectedTag && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Filtered by tag:</span>
              <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">{selectedTag}</span>
                <button
                  onClick={() => setSelectedTag("")}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                  title="Clear tag filter"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results info */}
        {allPets.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-600">
              Found {totalCount} pets
              {debouncedSearch && ` matching "${debouncedSearch}"`}
              {selectedTag && ` with tag "${selectedTag}"`}
              {allPets.length < totalCount && (
                <span className="text-gray-500">
                  {" "}
                  (showing {allPets.length})
                </span>
              )}
            </p>
          </div>
        )}

        {/* Loading state */}
        {isLoading && <LoadingGrid />}

        {/* Pets grid */}
        {!isLoading && allPets.length > 0 && (
          <div
            key={`pets-grid-${debouncedSearch}-${selectedTag}-${visiblePages}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {allPets.map((pet: Pet, index: number) => {
              return (
                <PetCard
                  key={`${pet.id}-${debouncedSearch}-${selectedTag}-${index}`}
                  pet={pet}
                  onTagClick={handleTagClick}
                />
              );
            })}
          </div>
        )}

        {/* No results */}
        {!isLoading && allPets.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Frown className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No pets found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {debouncedSearch
                  ? `No pets match your search "${debouncedSearch}"`
                  : selectedTag
                  ? `No pets found with tag "${selectedTag}"`
                  : `No ${status} pets available right now`}
              </p>
              <div className="mt-4 space-x-2">
                {debouncedSearch && (
                  <button
                    onClick={() => setSearch("")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Clear search
                  </button>
                )}
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag("")}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Clear tag filter
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Loading more indicator */}
        {hasMorePages && allPets.length > 0 && (
          <div className="flex justify-center py-8">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-gray-600">Loading more pets...</span>
            </div>
          </div>
        )}

        {/* End of results */}
        {!hasMorePages && allPets.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">You&apos;ve seen all the pets!</p>
          </div>
        )}
      </div>
    </div>
  );
}
