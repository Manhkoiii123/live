"use server";
import { blockUser, unBlockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  //TODO : disconnect from live
  // TODO allow abiliti to kick the guest
  const blockedUser = await blockUser(id);
  revalidatePath("/");
  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`);
  }
  return blockedUser;
};
export const onUnBlock = async (id: string) => {
  const unblockedUser = await unBlockUser(id);
  revalidatePath("/");
  if (unblockedUser) {
    revalidatePath(`/${unblockedUser.blocked.username}`);
  }
  return unblockedUser;
};
