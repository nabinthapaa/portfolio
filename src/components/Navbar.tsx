import NavbarMenu from "./client/NavbarMenu";
import { styles } from "@/styles";

const Navbar = () => {
  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <NavbarMenu />
      </div>
    </nav>
  );
};

export default Navbar;
