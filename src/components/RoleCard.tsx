import { Role, RoleId } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface RoleCardProps {
  selectedRoleId?: RoleId;
  role: Role;
  index: number;
}
const ROLE_COLORS: Record<RoleId, string> = {
  expert: "bg-green-100 border-green-300",
  caretaker: "bg-green-100 border-green-300",
  innovator: "bg-purple-100 border-purple-300",
  supporter: "bg-pink-100 border-pink-300",
  challenger: "bg-yellow-100 border-yellow-300",
  organizer: "bg-blue-100 border-blue-300",
  connector: "bg-emerald-100 border-emerald-300",
  strategist: "bg-slate-100 border-slate-300",
  builder: "bg-blue-100 border-blue-300",
  leader: "bg-amber-100 border-amber-300",
} as const;

const RoleCard = ({ role, selectedRoleId, index }: RoleCardProps) => {
  const isSelected = selectedRoleId === role.id;

  return (
    <div
      className={cn(
        `flex w-40 aspect-[1.5] shrink-0 flex-col text-left rounded-2xl border p-3 font-light shadow-sm transition-all duration-300 ease-in-out origin-left`,
        isSelected
          ? ROLE_COLORS[role.id] + " border-2 w-65 h-45"
          : "border-border text-[#10131a] bg-background"
      )}
    >
      <span className={cn("font-serif", isSelected ? "text-2xl" : "text-xl")}>
        {role.name}
      </span>
      <div className="flex justify-between mt-auto  items-center">
        <p
          className={cn(
            `font-serif `,
            isSelected ? "text-9xl  text-gray-300" : "text-7xl text-gray-200"
          )}
        >
          {index}
        </p>
        <Image
          src={`/roles/${role.id}.svg`}
          alt={`${role.name} symbol`}
          width={isSelected ? 80 : 60}
          height={isSelected ? 80 : 60}
          className="transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default RoleCard;
