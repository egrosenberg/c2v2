"use server";

import { routeDefs } from "@/lib/routeDefs";
import { findKeeperClasses } from "@db/services/keeper-classes/find-keeper-classes";
import type { Route } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export default async function keeperClassesPage() {
  const keeperClasses = await findKeeperClasses();
  if (keeperClasses.records[0])
    redirect(
      routeDefs.classPage({
        keeperClassId: keeperClasses.records[0].id,
      }),
    );
  notFound();
  return (
    <Suspense>
      <></>
    </Suspense>
  );
}
