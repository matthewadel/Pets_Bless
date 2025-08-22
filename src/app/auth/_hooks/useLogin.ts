import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginSchema, type LoginFormData } from "../_schemas";
import { useGetUser } from "./useGetUser";
import { loginUser } from "../_services";

export function useLogin() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getUser } = useGetUser();

  async function loginMutation({ username, password }: LoginFormData) {
    await loginUser(username, password);
  }

  const loginMutationQuery = useMutation({
    mutationFn: loginMutation,
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
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    loginMutationQuery.mutate(data);
    setIsSubmitting(false);
  }

  return {
    handleSubmit,
    errors,
    isSubmitting,
    isPending: loginMutationQuery.isPending,
  };
}
