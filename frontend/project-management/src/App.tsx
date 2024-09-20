import { Route, Routes } from "react-router-dom";
import { Home, ProjectsPage, SharedLayout } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/users" />
          <Route path="/projects/:projectName" element={<ProjectsPage />} />
          <Route path="*" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
