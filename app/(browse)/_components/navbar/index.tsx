import Actions from "@/app/(browse)/_components/navbar/Actions";
import Logo from "@/app/(browse)/_components/navbar/Logo";
import Search from "@/app/(browse)/_components/navbar/Search";

const Navbar = () => {
  return (
    <nav className="fixed text-white top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo />
      <Search />
      <Actions />
    </nav>
  );
};

export default Navbar;
