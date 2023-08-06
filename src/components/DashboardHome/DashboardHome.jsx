import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>Hello, {user?.displayName}</h1>
    </div>
  );
};

export default DashboardHome;
