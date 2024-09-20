import { ReactNode } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useAuth } from "../../store/useAuth";

interface listShowProps {
  title: string;
  toggleModal: () => void;
  btnTitle: string;
  children: ReactNode;
}

const ListShow = ({ title, toggleModal, btnTitle, children }: listShowProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="w-full flex gap-4 flex-col items-start">
      <div className=" flex items-center gap-4">
        <h2 className="text-base font-medium">{title}</h2>
        {isAuthenticated && (
          <button
            type="button"
            onClick={toggleModal}
            className="text-nowrap border outline-none rounded-lg px-4 py-1 bg-primary text-white transition-all ease-in duration-200 hover:bg-secondary text-base font-normal flex items-center gap-2 flex-nowrap"
          >
            {btnTitle}
            <FiPlusCircle className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="w-full p-2">{children}</div>
    </div>
  );
};

export default ListShow;
