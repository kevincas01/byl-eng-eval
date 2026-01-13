import { Role} from "@/lib/types";
import RoleAlignment from "./RoleAlignment";

interface SelectedRoleProps {
  selectedRole: Role;
  roleUserScore: number;
  roleRank: number;
}
const SelectedRole = ({
  selectedRole,
  roleUserScore,
  roleRank,
}: SelectedRoleProps) => {
  return (
    <div className="flex flex-col gap-6 px-5 sm:px-10">
      <div>
        <h2>
          Who <em>is</em> an {selectedRole.name}?
        </h2>
        <p className="font-serif text-lg">{selectedRole.role_desc}</p>
      </div>
      <div>
        <h2 className="capitalize">You feel most like you when...</h2>
        <p className="font-serif text-lg">{selectedRole.most_like_when}</p>
      </div>
      <div>
        <h2 className="capitalize">Core Drive</h2>
        <p className="font-serif text-lg">{selectedRole.core_drive}</p>
      </div>
      <RoleAlignment
        selectedRole={selectedRole}
        roleUserScore={roleUserScore}
        roleRank={roleRank}
      />
    </div>
  );
};

export default SelectedRole;
