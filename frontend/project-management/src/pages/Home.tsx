import { useState } from "react";
import { ListShow } from "../components/home";

const Home = () => {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([{ _id: "1", name: "پوری" }]);
  const [projects, setProjects] = useState([]);

  return (
    <div className="">
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

      <section className="border border-[#e2e2e2] mt-8 rounded-lg p-4 flex flex-col lg:flex-row items-start gap-4">
        {/* <ListShow link={`/users/`} items={employees} title="کارمندان" /> */}
        <ListShow link={`/projects/`} items={projects} title="پروژه ها" />
      </section>
    </div>
  );
};

export default Home;
