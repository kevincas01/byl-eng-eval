import { Role, RoleResults, RoleType } from "@/lib/types";
import RoleCard from "../RoleCard";

interface RoleTypeContainerProps {
  roleResults: RoleResults;
  startingIndex: number;
  roleType: RoleType;
}

const ROLE_TYPE_TEXT: Record<RoleType, { title: string; description: string }> =
  {
    core: {
      title: "Core Roles",
      description: "The roles you most align with",
    },
    intermediate: {
      title: "Intermediate Roles",
      description: "Roles you moderately align with",
    },
    peripheral: {
      title: "Peripheral Roles",
      description: "Roles you least align with",
    },
  };

const RoleTypeContainer = ({
  roleResults,
  startingIndex,
  roleType,
}: RoleTypeContainerProps) => {
  const roleText = ROLE_TYPE_TEXT[roleType];

  return (
    <div className="bg-secondaryBg p-10 rounded-3xl flex flex-col text-center items-center justify-center max-w-3xl">
      <div className="mb-5">
        <h2 className="capitalize">{roleText.title}</h2>
        <p className="font-serif text-lg">{roleText.description}</p>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-center">
        {roleResults.map((role: Role, index) => (
          <RoleCard
            key={role.id}
            role={role}
            index={index + startingIndex + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default RoleTypeContainer;
