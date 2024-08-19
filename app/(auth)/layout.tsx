import Logo from "@/app/(auth)/_components/Logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
