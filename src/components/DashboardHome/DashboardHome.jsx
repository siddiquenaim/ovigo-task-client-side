import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="text-center space-y-5">
      <div className="avatar online">
        <div className="w-24 rounded-full">
          <img src={user?.photoURL} />
        </div>
      </div>
      <h1 className="text-3xl">Hello, {user?.displayName}</h1>
    </div>
  );
};

export default DashboardHome;
