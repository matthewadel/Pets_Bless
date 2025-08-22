import { useQuery } from "@tanstack/react-query";
import { PetStatus } from "@/types";
import { useMemo } from "react";
import { fetchAllPetsByStatus } from "../_services";

const PETS_PER_PAGE = 20;

export function usePets(
  status: PetStatus,
  search: string,
  selectedTag: string = ""
) {
  // Only fetch data when status changes (not search/tag)
  const {
    data: allPets = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pets", status], // Only status in the key!
    queryFn: () => fetchAllPetsByStatus(status),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // All filtering and pagination logic centralized here
  const processedData = useMemo(() => {
    let filteredPets = allPets;

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPets = filteredPets.filter((pet) =>
        pet.name?.toLowerCase().includes(searchLower)
      );
    }

    // Apply tag filter
    if (selectedTag) {
      const tagLower = selectedTag.toLowerCase().trim();
      filteredPets = filteredPets.filter((pet) => {
        if (!pet.tags || pet.tags.length === 0) return false;
        return pet.tags.some((tag) => {
          if (!tag.name) return false;
          return tag.name.toLowerCase().trim() === tagLower;
        });
      });
    }

    // Calculate pagination pages
    const totalCount = filteredPets.length;
    const totalPages = Math.ceil(totalCount / PETS_PER_PAGE);

    // Create pages array for pagination
    const pages = [];
    for (let page = 0; page < totalPages; page++) {
      const startIndex = page * PETS_PER_PAGE;
      const endIndex = startIndex + PETS_PER_PAGE;
      const pets = filteredPets.slice(startIndex, endIndex);

      pages.push({
        pets,
        hasMore: page < totalPages - 1,
        nextPage: page + 1,
        totalCount,
      });
    }

    return {
      pages:
        pages.length > 0
          ? pages
          : [{ pets: [], hasMore: false, nextPage: 1, totalCount: 0 }],
      totalCount,
      totalPages,
    };
  }, [allPets, search, selectedTag]);

  return {
    data: processedData,
    isLoading,
    isError,
    error,
  };
}
