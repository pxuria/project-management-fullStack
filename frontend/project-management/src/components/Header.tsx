import { NavLink } from "react-router-dom";
import { navLinks } from "../constants";

const Header = () => {
  return (
    <header className="container mx-auto px-6 py-4 flex justify-between">
      <nav className="flex items-center gap-6 w-full">
        {navLinks.map((item) => (
          <NavLink key={item.id} to={item.link} className="text-base font-normal">
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="">
        <button
          type="button"
          onClick={() => {}}
          className="text-nowrap border outline-none rounded-lg px-4 py-1 bg-primary text-white transition-all ease-in duration-200 hover:bg-secondary text-base font-medium"
        >
          حساب کاربری
        </button>
      </div>
    </header>
  );
};

export default Header;
