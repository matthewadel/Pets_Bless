import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerSchema, type RegisterFormData } from "../_schemas";
import { useGetUser } from "./useGetUser";
import { registerUser } from "../_services";

export function useRegister() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getUser } = useGetUser();

  async function registerMutation(data: RegisterFormData) {
    return await registerUser(data);
  }

  const registerMutationQuery = useMutation({
    mutationFn: registerMutation,
    onSuccess: (_, variables) => {
      // Use the username from the mutation variables
      getUser(variables.username);
    },
    onError: (error) => {
      setErrors({ submit: error.message });
    },
  });

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrors({});

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
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    registerMutationQuery.mutate(data);
    setIsSubmitting(false);
  }

  return {
    handleSubmit,
    errors,
    isSubmitting,
    isPending: registerMutationQuery.isPending,
  };
}
