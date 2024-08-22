import Container from "@/app/(dashboard)/u/[username]/_components/Container";
import Navbar from "@/app/(dashboard)/u/[username]/_components/navbar";
import Sidebar from "@/app/(dashboard)/u/[username]/_components/sidebar";
import { getSeftByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import React from "react";
interface CreatorLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}
const CreatorLayout = async ({ children, params }: CreatorLayoutProps) => {
  const self = await getSeftByUsername(params.username);
  if (!self) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;
