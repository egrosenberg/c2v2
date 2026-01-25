import { useSession } from "next-auth/react";

export function useGetSession() {
  const { data, status } = useSession();

  return { ...data, status };
}
