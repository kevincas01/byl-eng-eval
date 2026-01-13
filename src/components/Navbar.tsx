"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAVBAR_ITEMS = [
  { label: "Summary", path: "/discover" },
  { label: "Role Breakdown", path: "/discover/breakdown" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
  });
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = NAVBAR_ITEMS.findIndex(
      (item) => pathname === item.path
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
  }, [pathname]);

  return (
    <nav className="m-10 border-b-2 border-b-border relative">
      <div className="flex gap-6 text-lg mb-2">
        {NAVBAR_ITEMS.map((item, index) => (
          <Link
            key={item.label}
            href={item.path}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={cn(
              pathname === item.path ? "font-semibold" : "text-gray-500"
            )}
          >
            {item.label}
          </Link>
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

export default Navbar;
