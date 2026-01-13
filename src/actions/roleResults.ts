"use server";

import { getAllRoles } from "@/lib/data/roles";
import { RoleResults } from "@/lib/types";

export type GetRoleResultsSuccess = {
  ok: true;
  results: RoleResults;
};

export type GetRoleResultsError = {
  ok: false;
  error: string;
};

export type GetRoleResultsResponse =
  | GetRoleResultsSuccess
  | GetRoleResultsError;

export default async function getRoleResultsAction(): Promise<GetRoleResultsResponse> {
  const results = getAllRoles();

  if (!results) {
    return { ok: false, error: "Results not found" };
  }

  return { ok: true, results };
}
