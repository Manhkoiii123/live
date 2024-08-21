"use client";
import { RecommendedSkeleton } from "@/app/(browse)/_components/sidebar/Recommended";
import { ToggleSkeleton } from "@/app/(browse)/_components/sidebar/Toggle";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect, useState } from "react";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const { collapsed } = useSidebar();
  if (!isClient)
    return (
      <aside className="text-white fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-[#252731] border-r border-[#2d2e35] z-50">
        <ToggleSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  return (
    <aside
      className={cn(
        "text-white fixed left-0 flex flex-col w-60 h-full bg-[#252731] border-r border-[#2d2e35] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
