import { useState } from "react";
import { ProjectForm } from "../components/forms";
import { ListShow } from "../components/home";
import { Modal, Projects } from "../components/UI";
import { useAuth } from "../store/useAuth";

const Home = () => {
  const [search, setSearch] = useState("");

  const { user, isAuthenticated, toggleAddProduct, toggleAddProductHandler } = useAuth();

  return (
    <>
      {toggleAddProduct && (
        <Modal onClose={toggleAddProductHandler}>
          <ProjectForm onClose={toggleAddProductHandler} />
        </Modal>
      )}

      {/* search */}
      <div className="flex items-center w-full md:w-1/2 lg:w-1/3">
        <input
          type="text"
          name="search"
          value={search}
          placeholder="جستجو کنید..."
          onChange={(e) => setSearch(e.target.value)}
          className="h-[40px] outline-none border border-solid rounded-r-lg px-4 border-l-0 w-full"
        />
        <button
          onClick={() => {
            console.log(search);
          }}
          type="button"
          className="px-4 py-1 outline-none border h-[40px] rounded-l-lg text-white bg-primary"
        >
          جستجو
        </button>
      </div>

      {isAuthenticated && (
        <div className="mt-6">
          <h2 className="font-semibold text-4xl mb-2">{user.name}</h2>
          <span className="text-base font-normal text-gray-400 select-none">{user.email}</span>
        </div>
      )}

      {!isAuthenticated && <p className="my-8 font-semibold text-xl">برای نمایش پروژه ها وارد حساب کاربری خود شوید.</p>}

      <section className="border border-[#e2e2e2] mt-2 rounded-lg p-4 flex flex-col lg:flex-row items-start gap-4">
        {isAuthenticated && (
          <ListShow title="پروژه ها" toggleModal={toggleAddProductHandler} btnTitle="اضافه پروژه">
            <Projects />
          </ListShow>
        )}
      </section>
    </>
  );
};

export default Home;
