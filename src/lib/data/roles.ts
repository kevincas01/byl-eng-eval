import raw from "@/data/roles.json";
import { Role, RoleId, RoleResults } from "@/lib/types";

const ROLES = raw as RoleResults;

export function getAllRoles(): RoleResults {
  return ROLES;
}

export function getRoleById(roleId: RoleId): Role | null {
  return ROLES.find((role) => role.id === roleId) ?? null;
}
