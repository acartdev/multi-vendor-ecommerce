import CommunityTrainings from "@/components/frontend/CommunityTrainings";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page() {
  const trainings = await getData("trainings");

  return <CommunityTrainings title="Read All Our Training" trainings={trainings} />;
}
