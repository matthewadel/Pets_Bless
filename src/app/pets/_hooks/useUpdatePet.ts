import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePetDetails, updatePetImage } from "../_services";

/**
 * Custom hook for updating pet details and images using React Query
 *
 * Uses the PetStore API:
 * - Updates pet name and status: POST https://petstore.swagger.io/v2/pet/{id} (form-data)
 * - Updates pet image: POST https://petstore.swagger.io/v2/pet/{id}/uploadImage (form-data)
 */
export function useUpdatePet() {
  const queryClient = useQueryClient();

  const updatePetDetailsMutation = useMutation({
    mutationFn: updatePetDetails,
    onSuccess: (_, variables) => {
      // Invalidate and refetch pet details to get updated data
      queryClient.invalidateQueries({
        queryKey: ["pet_details", variables.id],
      });
      // Also invalidate pets list to ensure consistency
      queryClient.invalidateQueries({
        queryKey: ["pets"],
      });
    },
  });

  const updatePetImageMutation = useMutation({
    mutationFn: updatePetImage,
    onSuccess: (_, variables) => {
      // Invalidate and refetch pet details to get updated data
      queryClient.invalidateQueries({
        queryKey: ["pet_details", variables.id],
      });
      // Also invalidate pets list to ensure consistency
      queryClient.invalidateQueries({
        queryKey: ["pets"],
      });
    },
  });

  return {
    updatePet: updatePetDetailsMutation.mutateAsync,
    updatePetImage: updatePetImageMutation.mutateAsync,
    isLoading:
      updatePetDetailsMutation.isPending || updatePetImageMutation.isPending,
    error: updatePetDetailsMutation.error || updatePetImageMutation.error,
  };
}
