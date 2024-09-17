import { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "../constants";
import { Modal } from "./UI";
import { AuthForm } from "./forms";

const Header = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId") && localStorage.getItem("token")) setIsLoggedIn(true);
  }, []);

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
          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="text-nowrap border-2 border-[#777] outline-none rounded-lg px-4 py-1 bg-white text-black transition-all ease-in duration-200 hover:bg-[#e9e9e9] text-base font-medium flex items-center flex-nowrap gap-2"
            >
              <IoPerson />
              حساب کاربری
            </button>
          ) : (
            <button
              type="button"
              onClick={handleToggleModal}
              className="text-nowrap border outline-none rounded-lg px-4 py-1 bg-primary text-white transition-all ease-in duration-200 hover:bg-secondary text-base font-medium"
            >
              ورود به حساب کاربری
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
