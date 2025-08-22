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

// Function to fetch individual pet details by ID
export async function fetchPetById(petId: string | number): Promise<Pet> {
  try {
    const response = await fetch(
      `https://petstore.swagger.io/v2/pet/${petId}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Pet not found");
      }
      throw new Error(`Failed to fetch pet: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch pet details"
    );
  }
}
