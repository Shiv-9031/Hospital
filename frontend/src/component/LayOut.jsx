import React from "react";
import "../style/Layout.css";
import { UserMenu, AdminMenu } from "./Menu/SideBarMenu.mjs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { message, Badge } from "antd";
import { setUser } from "../redux/features/UserSlice.mjs";

export default function LayOut({ children }) {
  const { user } = useSelector((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //logout function

  const handleLogout = () => {
    localStorage.clear();
    message.success("loggout succesfully");
    dispatch(setUser(" "));
    navigate("/login");
  };

  const DoctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house-chimney",
    },
    {
      name: "Appointment",
      path: "/appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  const SideBarMenu = user.isAdmin
    ? AdminMenu
    : user?.isDoctor
    ? DoctorMenu
    : UserMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DOCTOR APP</h6>
              <hr />
            </div>
            <div className="menu">
              {SideBarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div className={`menu-list ${isActive ? "active" : null}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className={`menu-list `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to={"/login"}>Log Out</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user?.notification?.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i className="fa-sharp fa-solid fa-bell"></i>
                </Badge>

                <Link to="\profile">{user.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
