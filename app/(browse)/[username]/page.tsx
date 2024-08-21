import { Actions } from "@/app/(browse)/[username]/_components/actions";
import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import React from "react";
interface UserPageprops {
  params: {
    username: string;
  };
}
const UserPage = async ({ params: { username } }: UserPageprops) => {
  const user = await getUserByUsername(username);
  if (!user) {
    notFound();
  }
  const isFollowing = await isFollowingUser(user.id);
  return (
    <div className="text-white flex flex-col gap-y-4">
      <p>{username}</p>
      <p>{user.id}</p>
      <p>is following : {`${isFollowing}`}</p>
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
};

export default UserPage;
