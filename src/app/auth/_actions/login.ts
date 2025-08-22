"use server";

import { loginUser, getUserByUsername } from "../_services";
import { loginSchema, type LoginFormData } from "../_schemas";

export async function loginAction(formData: FormData) {
  const data: LoginFormData = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  // Validate the form data
  const validation = loginSchema.safeParse(data);
  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};
    validation.error.issues.forEach((issue) => {
      fieldErrors[issue.path[0] as string] = issue.message;
    });
    return {
      success: false,
      errors: fieldErrors,
    };
  }

  try {
    // First, authenticate the user
    await loginUser(data.username, data.password);
    // Then, get user details
    const user = await getUserByUsername(data.username);

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      errors: {
        submit: error instanceof Error ? error.message : "Login failed",
      },
    };
  }
}
