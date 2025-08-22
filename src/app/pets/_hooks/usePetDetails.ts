import { useQuery } from "@tanstack/react-query";
import { fetchPetById } from "../_services";
import { Pet } from "@/types";

export function usePetDetails(petId: string | number) {
  return useQuery({
    queryKey: ["pet_details", petId],
    queryFn: async () => {
      try {
        // Try to fetch from API first
        return await fetchPetById(petId);
      } catch (error) {
        // If API fails, try to get from cache
        const storedPet = localStorage.getItem("selectedPet");
        if (storedPet) {
          try {
            const parsedPet: Pet = JSON.parse(storedPet);
            // Verify it's the same pet by ID
            if (parsedPet.id === parseInt(petId.toString())) {
              return parsedPet;
            }
          } catch (cacheError) {
            console.error("Error parsing cached pet data:", cacheError);
          }
        }
        // If cache also fails or doesn't match, throw the original API error
        throw error;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!petId, // Only run query if petId exists
  });
}
