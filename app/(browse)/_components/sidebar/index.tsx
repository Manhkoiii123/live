import Following, {
  FollowingSkeleton,
} from "@/app/(browse)/_components/sidebar/Following";
import Recommended, {
  RecommendedSkeleton,
} from "@/app/(browse)/_components/sidebar/Recommended";
import Toggle, {
  ToggleSkeleton,
} from "@/app/(browse)/_components/sidebar/Toggle";
import Wrapper from "@/app/(browse)/_components/sidebar/wrapper";
import { getFollowedUsers } from "@/lib/follow-service";
import { getRecommended } from "@/lib/recommented-service";
import React from "react";

const Sidebar = async () => {
  const recommended = await getRecommended();
  const follows = await getFollowedUsers();

  return (
    <Wrapper>
      <Toggle />
      <div className=" space-y-4 pt-4 lg:pt-0">
        <Following data={follows} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export default Sidebar;
export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-[#252731] border-r border-[#2d2e35] z-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
