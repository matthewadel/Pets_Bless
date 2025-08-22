import { Pet, PetStatus } from "@/types";

interface UpdatePetParams {
  id: string;
  name: string;
  status: PetStatus;
}

interface UpdateImageParams {
  id: string;
  file: File;
}

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
    const response = await fetch(`https://petstore.swagger.io/v2/pet/${petId}`);

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

// Function to update pet details (name and status)
export async function updatePetDetails({
  id,
  name,
  status,
}: UpdatePetParams): Promise<void> {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("status", status);

    const response = await fetch(`https://petstore.swagger.io/v2/pet/${id}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to update pet: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update pet details"
    );
  }
}

// Function to update pet image
export async function updatePetImage({
  id,
  file,
}: UpdateImageParams): Promise<void> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `https://petstore.swagger.io/v2/pet/${id}/uploadImage`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update image: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update pet image"
    );
  }
}
