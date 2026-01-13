"use server";

import { getUserResults } from "@/lib/data/users";
import { UserRoleResults, UserId } from "@/lib/types";

export type GetUserResultsSuccess = {
  ok: true;
  userId: UserId;
  results: UserRoleResults;
};

export type GetUserResultsError = {
  ok: false;
  error: string;
};

export type GetUserResultsResponse =
  | GetUserResultsSuccess
  | GetUserResultsError;

export default async function getUserResultsAction(
  userId: string
): Promise<GetUserResultsResponse> {
  if (!userId || typeof userId !== "string") {
    return { ok: false, error: "Missing or invalid userId" };
  }

  const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/users/${userId}`,
      {
        method: "GET" 
      }
    );

  if (!response.ok) {
    const errorData = await response.json();
    return {
      ok: false,
      error: errorData.error || "Failed to fetch user results",
    };
  }

  const data = await response.json();

  if (!data.results) {
    return { ok: false, error: "Results not found" };
  }

  return { ok: true, userId, results: data.results };
}
