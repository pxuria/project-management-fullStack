import { Navigate, Route, Routes } from "react-router-dom";
import { Home, ProjectsPage, ProtectedRoute, SharedLayout, Users } from "./pages";
import { useAuth } from "./store/useAuth";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/projects/:projectId" element={<ProjectsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
