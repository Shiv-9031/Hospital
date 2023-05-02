import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { Login } from "./pages/Login";
import { RegistrationPage } from "./pages/Register";
import { useSelector } from "react-redux";
import { Spinner } from "./component/Spinner.mjs";
import ProtectedRoutes from "./component/ProtectedRoutes.mjs";
import PublicRoutes from "./component/PublicRoutes.mjs";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Doctors from "./pages/Admin/Doctors";
import Users from "./pages/Admin/Users";
import { Profile } from "./pages/doctor/Profile";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoutes>{<HomePage />}</ProtectedRoutes>}
            />
            <Route
              path="/login"
              element={<PublicRoutes>{<Login />}</PublicRoutes>}
            />
            <Route
              path="/register"
              element={<PublicRoutes>{<RegistrationPage />}</PublicRoutes>}
            />
            <Route
              path="/apply-doctor"
              element={<ProtectedRoutes>{<ApplyDoctor />}</ProtectedRoutes>}
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoutes>{<NotificationPage />}</ProtectedRoutes>
              }
            />
            <Route
              path="/doctor/profile/:id"
              element={<ProtectedRoutes>{<Profile />}</ProtectedRoutes>}
            />
            <Route
              path="/admin/doctors"
              element={<ProtectedRoutes>{<Doctors />}</ProtectedRoutes>}
            />
            <Route
              path="/admin/users"
              element={<ProtectedRoutes>{<Users />}</ProtectedRoutes>}
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
