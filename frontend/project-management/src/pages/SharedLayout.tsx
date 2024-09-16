import { Outlet } from "react-router-dom";
import { Header } from "../components";

const SharedLayout = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-10 mt-8">
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;
