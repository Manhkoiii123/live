import Navigation from "@/app/(dashboard)/u/[username]/_components/sidebar/Navigation";
import Toggle from "@/app/(dashboard)/u/[username]/_components/sidebar/Toggle";
import Wrapper from "@/app/(dashboard)/u/[username]/_components/sidebar/Wrapper";

const Sidebar = () => {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
};

export default Sidebar;
