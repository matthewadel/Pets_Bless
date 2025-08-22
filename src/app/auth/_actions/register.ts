"use server";

import { registerUser } from "../_services";
import { registerSchema, type RegisterFormData } from "../_schemas";

export async function registerAction(formData: FormData) {
  const data: RegisterFormData = {
    username: formData.get("username") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    phone: formData.get("phone") as string,
  };

  // Validate the form data
  const validation = registerSchema.safeParse(data);
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
    const user = await registerUser(data);
    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      errors: {
        submit: error instanceof Error ? error.message : "Registration failed",
      },
    };
  }
}
