import Container from "@/app/(browse)/_components/Container";
import Navbar from "@/app/(browse)/_components/navbar";
import Sidebar from "@/app/(browse)/_components/sidebar";

const BrowerLayout = ({ children }: { children: React.ReactNode }) => {
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

export default BrowerLayout;
