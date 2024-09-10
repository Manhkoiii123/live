"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}
const StreamPlayer = ({ isFollowing, stream, user }: StreamPlayerProps) => {
  const { identity, name, token } = useViewerToken(user.id);
  if (!token || !name || !identity) {
    return <div>cannot</div>;
  }
  return <div>can</div>;
};

export default StreamPlayer;
