import { Role } from "@/lib/types";
import MeterBar from "./MeterBar";

interface RoleAlignmentProps {
  selectedRole: Role;
  roleUserScore: number;
  roleRank: number;
}
const RoleAlignment = ({
  selectedRole,
  roleUserScore,
  roleRank,
}: RoleAlignmentProps) => {
  const roleRankStatus: "high" | "low" | "none" =
    roleRank > 0 && roleRank <= 4
      ? "high"
      : roleRank > 7 && roleRank <= 10
      ? "low"
      : "none";

  const getRoleAlignmentStatements = () => {
    const statements = [];
    switch (roleRank) {
      case 1:
        statements.push(selectedRole.top_rank_desc);
      case 2:
      case 3:
      case 4:
        statements.push(selectedRole.core_rank_desc);
        break;
      case 8:
      case 9:
        statements.push(selectedRole.peripheral_rank_desc);
        break;
      case 10:
        statements.push(selectedRole.peripheral_rank_desc);
        statements.push(selectedRole.bottom_rank_desc);
        break;
    }
    return statements;
  };

  return (
    <div className=" bg-secondaryBg p-10 rounded-3xl space-y-10">
      <h2>Role Alignment</h2>

      <MeterBar value={roleUserScore} />

      {roleRankStatus !== "none" && (
        <div>
          <h3 className="capitalize">
            Understanding your {roleRankStatus} role alignment
          </h3>
          {getRoleAlignmentStatements().map(
            (statement: string, index: number) => (
              <p className="font-serif text-lg" key={index}>
                {statement}
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default RoleAlignment;
