import StreamPlayer from "@/components/stream-player/StreamPlayer";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs/server";

interface CreatorPageProps {
  params: {
    username: string;
  };
}
const CreatorPage = async ({ params: { username } }: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername(username);
  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }
  return (
    <div className="text-white h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
      {/* do đây là cái dashboard => stream của mình => isFoll = true */}
    </div>
  );
};

export default CreatorPage;
