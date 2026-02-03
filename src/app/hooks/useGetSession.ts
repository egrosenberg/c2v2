"use client";

import { useQuery } from "@/api";
import { svcGetLogtoRoles } from "@/api/logto";
import { useSession } from "next-auth/react";

export function useGetSession() {
  const { data, status } = useSession();

  const { data: roles } = useQuery(
    svcGetLogtoRoles,
    {
      options: { email: data?.user?.email },
    },
    [data?.user?.email],
  );

  return { ...data, status, roles };
}
