import { Route, Routes } from "react-router-dom";
import { Home, SharedLayout } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/users" />
          <Route path="/user/:userId/projects" />
          <Route path="/projects/:projectId " />
          <Route path="*" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
