import { db } from "@/lib/db";
import { getSeft } from "@/lib/auth-service";

export const getRecommended = async () => {
  //   const self = await getSeft();
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return users;
};
