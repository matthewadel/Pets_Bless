import { Pet, PetStatus } from "@/types";

// Simple function to fetch all pets by status - no pagination here
export async function fetchAllPetsByStatus(status: PetStatus): Promise<Pet[]> {
  try {
    const response = await fetch(
      `https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch pets: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch pets"
    );
  }
}
