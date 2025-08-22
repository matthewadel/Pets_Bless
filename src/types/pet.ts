export interface Pet {
  id: number;
  name: string;
  category?: {
    id: number;
    name: string;
  };
  photoUrls: string[];
  tags?: {
    id: number;
    name: string;
  }[];
  status: "available" | "pending" | "sold";
}

export type PetStatus = "available" | "pending" | "sold";

export interface PetsResponse {
  pets: Pet[];
  hasMore: boolean;
  nextPage: number;
  totalCount: number;
}
