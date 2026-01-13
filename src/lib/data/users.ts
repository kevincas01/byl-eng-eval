import raw from "@/data/users.json";
import { UserRoleResults, UserId, UserResultsMap } from "@/lib/types";

const USER_RESULTS = raw as UserResultsMap;

export function getUserResults(userId: UserId): UserRoleResults | null {
  return USER_RESULTS[userId] ?? null;
}
