import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/providers/auth-provider";
import { getUserByUsername } from "../_services";

export function useGetUser() {
  const { saveUserData } = useAuth();

  const getUserMutation = useMutation({
    mutationFn: getUserByUsername,
    onSuccess: (user) => {
      saveUserData(user);
    },
    onError: (error) => {
      console.error("Failed to get user:", error);
    },
  });

  return {
    getUser: getUserMutation.mutate,
    isLoading: getUserMutation.isPending,
    error: getUserMutation.error,
  };
}
