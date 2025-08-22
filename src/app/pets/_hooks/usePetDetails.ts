import { useQuery } from "@tanstack/react-query";
import { fetchPetById } from "../_services";

export function usePetDetails(petId: string | number) {
  return useQuery({
    queryKey: ["pet_details", petId],
    queryFn: () => fetchPetById(petId),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!petId, // Only run query if petId exists
  });
}
