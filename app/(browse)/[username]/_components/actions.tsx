"use client";

import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}
export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((res) =>
          toast.success(`You are now following ${res.following.username}`)
        )
        .catch((error) => toast.error(error.message));
    });
  };
  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(userId)
        .then((res) =>
          toast.success(`You are now unfollowing ${res.following.username}`)
        )
        .catch((error) => toast.error(error.message));
    });
  };
  return (
    <Button
      disabled={isPending}
      onClick={isFollowing ? handleUnFollow : handleFollow}
      variant={"primary"}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
