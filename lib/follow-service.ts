import { db } from "@/lib/db";
import { getSeft } from "@/lib/auth-service";

export const isFollowingUser = async (id: string) => {
  //check xem người đang đăng nhập có follow người có id là id ko
  try {
    const self = await getSeft();
    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!otherUser) {
      throw new Error("User not found");
    }
    if (otherUser.id === self.id) {
      return true;
    }
    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });
    return !!existingFollow;
  } catch (error) {
    return false;
  }
};
export const followUser = async (id: string) => {
  const self = await getSeft();
  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) {
    throw new Error("User not found");
  }
  if (otherUser.id === self.id) {
    throw new Error("Cannot follow yourself");
  }
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    throw new Error("Already following");
  }
  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      follower: true,
      following: true,
    },
  });

  return follow;
};
export const unFollowUser = async (id: string) => {
  const self = await getSeft();
  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) {
    throw new Error("User not found");
  }
  if (otherUser.id === self.id) {
    throw new Error("Cannot unfollow yourself");
  }
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    throw new Error("Not following");
  }

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      follower: true,
      following: true,
    },
  });
  return follow;
};
export const getFollowedUsers = async () => {
  try {
    const self = await getSeft();
    const followedUsers = db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocking: {
            none: {
              // các thằng bị chặn ko lấy ra từ following
              blockedId: self.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            stream: true,
          },
        },
      },
    });
    return followedUsers;
  } catch (error) {
    return [];
  }
};
