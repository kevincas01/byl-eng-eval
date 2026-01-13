"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
const ROLE_TYPES = [
  { label: "Core Roles", key: "core" },
  { label: "Intermediate Roles", key: "intermediate" },
  { label: "Peripheral Roles", key: "peripheral" },
];

interface RoleTypesProps {
  currentRoleType: string;
}
const RoleTypes = ({ currentRoleType }: RoleTypesProps) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
  });
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = ROLE_TYPES.findIndex(
      (item) => currentRoleType === item.key
    );

    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      const activeElement = itemRefs.current[activeIndex];
      if (activeElement) {
        setPosition({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
        });
      }
    }
  }, [currentRoleType]);
  return (
    <nav className="m-10 border-b-2 border-b-border w-max relative pr-20">
      <div className="flex gap-6 text-lg mb-2">
        {ROLE_TYPES.map((item, index) => (
          <div
            key={item.label}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={cn(
              currentRoleType === item.key ? "font-semibold" : "text-gray-500"
            )}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div
        className="absolute bottom-0 h-1 rounded-t-full bg-border transition-all duration-300 ease-in-out"
        style={{
          left: `${position.left}px`,
          width: `${position.width}px`,
        }}
      />
    </nav>
  );
};

export default RoleTypes;
