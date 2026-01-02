import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/proroutes";
import ToDoList from "./pages/to-dolist";
import LandingPage from "./pages/landing";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<LandingPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/todolist"
        element={
          <ProtectedRoute>
            <ToDoList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
