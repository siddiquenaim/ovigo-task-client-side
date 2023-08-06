import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserCommunity = () => {
  const [userCommunity, setUserCommunity] = useState([]);

  const url = `http://localhost:5000/allCommunities?userEmail=${user?.email}`;

  useEffect(() => {
    fetch(url);
  });
  return (
    <div>
      <h1>You haven't created a community yet</h1>
      <div className="my-4 text-center">
        <Link to="create-community">
          <button className="btn">Create Your Community</button>
        </Link>
      </div>
    </div>
  );
};

export default UserCommunity;
