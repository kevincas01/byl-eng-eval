import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RoleResults, RoleResultsMap, UserRoleResults } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function roleResultsToMap(roleResults: RoleResults): RoleResultsMap {
  return roleResults.reduce((acc, role) => {
    acc[role.id] = role;
    return acc;
  }, {} as RoleResultsMap);
}

export function sortRoleResultsBasedOnUserScore(
  roleResults: RoleResults,
  userResults: UserRoleResults
): RoleResults {
  return [...roleResults].sort((a, b) => {
    return userResults[b.id] - userResults[a.id];
  });
}
