"use client";
import { useState, useRef, useEffect} from "react";
import RoleCard from "../RoleCard";
import {
  Role,
  RoleResults,
  RoleResultsMap,
  RoleType,
  UserRoleResults,
} from "@/lib/types";
import SelectedRole from "./SelectedRole";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import RoleTypes from "./RoleTypes";

interface BreakdownContainerProps {
  userResults: UserRoleResults;
  roleResults: RoleResults;
  roleResultsMap: RoleResultsMap;
}
const BreakdownContainer = ({
  userResults,
  roleResults,
  roleResultsMap,
}: BreakdownContainerProps) => {
  const router = useRouter();
  const [currentRoleType, setCurrentRoleType] = useState<RoleType>("core");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [sidePadding, setSidePadding] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updatePadding = () => {
      const containerWidth = containerRef.current?.clientWidth || 0;
      const padding = containerWidth / 2 - 130; // 130px is roughly half the card width (160/2 + some buffer)
      setSidePadding(Math.max(0, padding));
    };

    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => window.removeEventListener("resize", updatePadding);
  }, []);

  const scrollToCard = (delta: number) => {
    const newIndex = Math.max(
      0,
      Math.min(roleResults.length - 1, selectedIndex + delta)
    );
    setSelectedIndex(newIndex);

    const rank = newIndex + 1;
    if (rank <= 4) {
      setCurrentRoleType("core");
    } else if (rank <= 7) {
      setCurrentRoleType("intermediate");
    } else {
      setCurrentRoleType("peripheral");
    }

    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = 160 + 16;

    container.scrollTo({
      left: newIndex * cardWidth,
      behavior: "smooth",
    });
  };

  const rerouteToSummary = () => {
    router.push("/discover");
  };

  const selectedRoleId = roleResults[selectedIndex].id;
  const selectedRole = roleResultsMap[selectedRoleId];
  const roleUserScore = userResults[selectedRoleId];
  const roleRank =
    roleResults.findIndex((role) => role.id === selectedRoleId) + 1;

  return (
    <div className="relative">
      <div className="px-10">
        <button
          onClick={rerouteToSummary}
          className="rounded-full bg-white border-2 border-border flex gap-2  px-4 py-2"
        >
          <ChevronLeft /> Back to Summary
        </button>
      </div>
      <RoleTypes currentRoleType={currentRoleType} />
      <div className="relative py-20" ref={containerRef}>
        <div className="absolute w-30 px-5 left-0 top-0 h-full flex items-center bg-linear-to-r from-background to-transparent z-10">
          <button
            onClick={() => scrollToCard(-1)}
            className="rounded-full border bg-background border-border p-2 disabled:bg-gray-200"
            disabled={selectedIndex === 0}
          >
            <ChevronLeft size={28} strokeWidth={2} />
          </button>
        </div>

        {/* Scroll Container */}
        <div
          className="overflow-x-hidden scroll-smooth py-5"
          ref={scrollContainerRef}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            className="flex w-max gap-4 items-center"
            style={{
              paddingLeft: `${sidePadding}px`,
              paddingRight: `${sidePadding}px`,
            }}
          >
            {roleResults.map((role: Role, index) => (
              <RoleCard
                key={role.id}
                role={role}
                selectedRoleId={selectedRoleId}
                index={index + 1}
              />
            ))}
          </div>
        </div>

        <div className="absolute w-30 px-5 right-0 top-0 h-full flex justify-end items-center bg-linear-to-r from-transparent to-background z-10">
          <button
            onClick={() => scrollToCard(+1)}
            className="rounded-full border bg-background border-border p-2"
            disabled={selectedIndex === roleResults.length - 1}
          >
            <ChevronRight size={28} strokeWidth={2} />
          </button>
        </div>
      </div>

      <SelectedRole
        selectedRole={selectedRole}
        roleUserScore={roleUserScore}
        roleRank={roleRank}
      />
    </div>
  );
};

export default BreakdownContainer;
