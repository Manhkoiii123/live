"use server";
import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";
import { getSeft } from "@/lib/auth-service";
import { getUserById } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";
export const createViewerToken = async (hostIdentity: string) => {
  let seft;
  try {
    seft = await getSeft();
    console.log(seft);
  } catch (error) {
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    seft = {
      id,
      username,
    };
  }
  const host = await getUserById(hostIdentity);
  if (!host) {
    throw new Error("Host not found");
  }
  const isBlock = await isBlockedByUser(host.id);
  if (isBlock) {
    throw new Error("Host is blocked");
  }
  const isHost = seft.id === host.id;
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: isHost ? `host-${seft.id}` : seft.id,
      name: seft.username,
    }
  );
  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });
  return await Promise.resolve(token.toJwt());
};
