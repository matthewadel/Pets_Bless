import { RegisterFormData } from "@/app/auth/_schemas/register";
import { User } from "@/types";

export async function loginUser(
  username: string,
  password: string
): Promise<void> {
  try {
    const response = await fetch(
      `https://petstore.swagger.io/v2/user/login?username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Login failed. Please try again.");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      "Network error. Please check your connection and try again."
    );
  }
}

export async function registerUser(userData: RegisterFormData): Promise<void> {
  try {
    const userPayload = {
      id: 0,
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      userStatus: 0,
    };

    const response = await fetch("https://petstore.swagger.io/v2/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userPayload),
    });

    if (!response.ok) {
      throw new Error("Registration failed. Please try again.");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      "Network error. Please check your connection and try again."
    );
  }
}

export async function getUserByUsername(username: string): Promise<User> {
  try {
    const response = await fetch(
      `https://petstore.swagger.io/v2/user/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found");
      }
      throw new Error("Failed to get user information");
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      "Network error. Please check your connection and try again."
    );
  }
}
