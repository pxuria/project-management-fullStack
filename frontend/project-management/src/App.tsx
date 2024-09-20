import { Route, Routes } from "react-router-dom";
import { Home, ProjectsPage, SharedLayout, Users } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/projects/:projectId" element={<ProjectsPage />} />
          <Route path="*" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
