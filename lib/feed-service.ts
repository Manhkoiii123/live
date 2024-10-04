import { getSeft } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const getStreams = async () => {
  let userId;
  try {
    const self = await getSeft();
    userId = self.id;
  } catch (error) {
    userId = null;
  }
  let streams = [];
  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
      },

      select: {
        user: true,
        thumbnailUrl: true,
        name: true,
        isLive: true,
        id: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      select: {
        user: true,
        thumbnailUrl: true,
        name: true,
        isLive: true,
        id: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  return streams;
};
