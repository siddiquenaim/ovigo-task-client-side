import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import { FaPlaneDeparture } from "react-icons/fa";
import { CgCommunity } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import { TbUsersPlus } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [userCommunity, setUserCommunity] = useState([]);

  const url = `https://ovigo-task-server-side.vercel.app/userCommunity?userEmail=${user?.email}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserCommunity(data[0]));
  });

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center my-10">
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden mt-10"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content space-y-3">
          {/* Sidebar content here */}
          <h1 className="uppercase p-4 mb-14">
            <span className="font-extrabold text-2xl flex-col">
              {" "}
              <FaPlaneDeparture className="mr-2"></FaPlaneDeparture> Travigo
            </span>{" "}
          </h1>
          <li>
            <NavLink to="user-community">
              <CgCommunity className="text-md"></CgCommunity> Your Community
            </NavLink>
          </li>
          {userCommunity && (
            <>
              <li>
                <NavLink to="manage-members">
                  <FiUsers></FiUsers> Manage Members
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="manage-posts">Manage Posts</NavLink>
              </li> */}
            </>
          )}
          <li>
            <NavLink to="joined-communities">
              <TbUsersPlus></TbUsersPlus> Joined Communities
            </NavLink>
          </li>
          <li>
            <Link to="/">
              <AiOutlineHome className="text-md"></AiOutlineHome> Home
            </Link>
          </li>
          <div className="divider"></div>
          {user?.photoURL && (
            <div className="flex items-center gap-6">
              <div className="avatar">
                <div className="w-12 rounded-full hover:ring cursor-pointer ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user?.photoURL} />
                </div>
              </div>
              <div className="font-semibold">{user?.displayName}</div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
