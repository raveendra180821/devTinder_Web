import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { clearUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { clearFeed } from "../utils/feedSlice";
import { clearRequests } from "../utils/requestSlice";
import { clearConnections } from "../utils/connectionSlice";
import { useEffect, useState } from "react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import images from "../utils/images";
import { useSocket } from "../utils/SocketContext";
import Notifications from "./Notifications";

const NavBar = () => {
  const user = useSelector((state) => state.user);

  const { notifications } = useSocket();
  const { targetUserId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // removing notifications from current chat
  const sanitisedNotifications = notifications.filter(
    (item) => targetUserId !== item.senderId,
  );

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true },
      );
      dispatch(clearUser());
      dispatch(clearFeed());
      dispatch(clearRequests());
      dispatch(clearConnections());
      navigate("/login");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="navbar shrink-0 relative min-h-[64px] bg-[#102859] shadow-sm">
      <div className="flex-1">
        <Link to="/">
          <img
            src={images.navLogo}
            alt="Logo"
            className="w-24 md:w-28 lg:w-32 h-7 md:h-8 lg:h-9 hover:shadow-[0_0_15px_#0f1f3f] rounded-lg"
          />
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 items-center">
          <div className="max-[648px]:hidden flex items-center text-white-900 text-sm gap-8 mr-3">
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="relative">
                {sanitisedNotifications.length !== 0 && (
                  <span className="bg-red-600 w-2 h-2 absolute -top-0.5 -right-1 rounded-full" />
                )}
                <IoNotificationsCircleOutline className="size-7" />
              </div>
              <ul
                tabIndex={-1}
                className="dropdown-content menu bg-white text-slate-900 rounded-box z-1 w-45 p-2 shadow-sm"
              >
                <li
                  className={`text-[13px] text-center ${notifications.length === 0 ? "font-medium text-gray-400" : "font-bold"}`}
                >
                  {notifications.length === 0
                    ? "Empty "
                    : "You have notification from"}
                </li>
                {sanitisedNotifications.map((item) => {
                  if (targetUserId === item.senderId) return;
                  return <Notifications key={item.senderId} data={item} />;
                })}
              </ul>
            </div>
            <NavLink
              to="/requests"
              className={({ isActive }) =>
                `text-base font-medium hover:scale-106 duration-150 pb-1 ${isActive && "border-b-2 border-white/90 scale-106"}`
              }
            >
              Requets
            </NavLink>
            <NavLink
              to="/connections"
              className={({ isActive }) =>
                `text-base font-medium hover:scale-106 duration-150 pb-1 ${isActive && "border-b-2 border-white/90 scale-106"}`
              }
            >
              Connections
            </NavLink>
          </div>
          <div className="min-[648px]:hidden dropdown dropdown-end">
            <div tabIndex={0} role="button" className="m-1 relative">
              {sanitisedNotifications.length !== 0 && (
                <span className="bg-red-600 w-2 h-2 absolute -top-0.5 -right-1 rounded-full" />
              )}
              <IoNotificationsCircleOutline className="size-7" />
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-white text-slate-900 rounded-box z-1 w-45 p-2 shadow-sm"
            >
              <li
                className={`text-[13px] text-center ${notifications.length === 0 ? "font-medium text-gray-400" : "font-bold"}`}
              >
                {notifications.length === 0
                  ? "Empty "
                  : "You have notification from"}
              </li>
              {sanitisedNotifications.map((item) => {
                if (targetUserId === item.senderId) return;
                return <Notifications key={item.senderId} data={item} />;
              })}
            </ul>
          </div>
          <div className="dropdown dropdown-end mx-[8px]">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <figure className="shrink-0">
                <img
                  alt="Profile Photo"
                  src={user.photoUrl}
                  className="w-10 h-10 lg:w-11.5 lg:h-11.5 mt-1 rounded-full object-cover"
                />
              </figure>
            </div>
            <ul
              tabIndex="-1"
              className="menu dropdown-content bg-white text-slate-800 rounded-box z-[1] mt-[12px] w-[160px] p-[8px] shadow"
            >
              <li className="">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `hover:bg-base-100 hover:text-white hover:rounded-md group ${isActive && "bg-slate-900 text-white rounded-md"}`
                  }
                >
                  Profile
                  <span className="badge group-hover:bg-white group-hover:text-slate-900 pb-0.5">
                    New
                  </span>
                </NavLink>
              </li>
              <li className="min-[648px]:hidden">
                <NavLink
                  to="/requests"
                  className={({ isActive }) =>
                    isActive && `bg-slate-900 text-[#fff]`
                  }
                >
                  Requests
                </NavLink>
              </li>
              <li className="min-[648px]:hidden ">
                <NavLink
                  to="/connections"
                  className={({ isActive }) =>
                    isActive && `bg-slate-900 text-[#fff]`
                  }
                >
                  Connections
                </NavLink>
              </li>
              <li className="hover:bg-base-100 hover:text-white hover:rounded-md">
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
