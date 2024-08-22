"use client";
import NavItem, { NavItemSkeleton } from "@/app/(dashboard)/u/[username]/_components/sidebar/NavItem";
import { useUser } from "@clerk/nextjs";
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const routes = [
    {
      label: "Stream",
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Commumity",
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ];
  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }
  return (
    <ul className="space-y-4 px-2 pt-4 lg:pt-0">
      {routes.map((r) => (
        <NavItem
          key={r.href}
          label={r.label}
          href={r.href}
          icon={r.icon}
          isActive={pathname === r.href}
        />
      ))}
    </ul>
  );
};

export default Navigation;
