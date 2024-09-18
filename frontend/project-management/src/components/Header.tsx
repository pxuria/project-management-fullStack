import { useState } from "react";
import { PiSignOutBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { navLinks } from "../constants";
import { useAuth } from "../store/useAuth";
import { Modal } from "./UI";
import { AuthForm } from "./forms";

const Header = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleToggleModal = () => setToggleModal(!toggleModal);

  return (
    <>
      {toggleModal && (
        <Modal onClose={handleToggleModal}>
          <AuthForm onClose={handleToggleModal} />
        </Modal>
      )}
      <header className="container mx-auto px-6 py-4 flex justify-between">
        <nav className="flex items-center gap-6 w-full">
          {navLinks.map((item) => (
            <NavLink key={item.id} to={item.link} className="text-base font-normal">
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div>
          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              className="text-nowrap outline-none rounded-md px-4 py-2 bg-red-600 text-white transition-all ease-in duration-200 hover:bg-red-500 text-base font-medium flex items-center flex-nowrap gap-2"
            >
              <PiSignOutBold />
              خروج از حساب
            </button>
          ) : (
            <button
              type="button"
              onClick={handleToggleModal}
              className="text-nowrap border outline-none rounded-lg px-4 py-1 bg-primary text-white transition-all ease-in duration-200 hover:bg-secondary text-base font-medium"
            >
              حساب کاربری
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
