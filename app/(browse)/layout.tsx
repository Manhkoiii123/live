import Navbar from "@/app/(browse)/_components/navbar";

const BrowerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20"> {children}</div>
    </>
  );
};

export default BrowerLayout;
