import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";

const UserCommunity = () => {
  const { user } = useContext(AuthContext);
  const [userCommunity, setUserCommunity] = useState([]);

  const url = `http://localhost:5000/allCommunities?userEmail=${user?.email}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserCommunity(data[0]));
  });

  return (
    <div>
      {userCommunity.length === 0 ? (
        <>
          <h1>You haven't created a community yet</h1>
          <div className="my-4 text-center">
            <Link to="create-community">
              <button className="btn">Create Your Community</button>
            </Link>
          </div>
        </>
      ) : (
        <>Community Name = {userCommunity?.name}</>
      )}
    </div>
  );
};

export default UserCommunity;
