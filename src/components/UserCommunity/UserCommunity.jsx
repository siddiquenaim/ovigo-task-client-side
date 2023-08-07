import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";

const UserCommunity = () => {
  const { user } = useContext(AuthContext);
  const [userCommunity, setUserCommunity] = useState([]);

  const url = `http://localhost:5000/userCommunity?userEmail=${user?.email}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserCommunity(data[0]));
  });

  return (
    <div>
      {!userCommunity ? (
        <>
          <h1>You haven't created a community yet</h1>
          <div className="my-4 text-center">
            <Link to="create-community">
              <button className="btn">Create Your Community</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl text-center">{userCommunity?.name}</h1>
          <div className="mt-20">
            <p>Admin Name: {userCommunity?.adminName}</p>
            <p> Admin Email: {userCommunity?.adminEmail}</p>
            <p>
              Total User:{" "}
              {userCommunity?.members ? (
                <span>{userCommunity?.members.length}</span>
              ) : (
                <span>0</span>
              )}
            </p>
            <p>
              Total Post:{" "}
              {userCommunity?.totalPost ? (
                <>
                  <span>${userCommunity?.totalPost}</span>{" "}
                  <button className="btn">Manage User</button>
                </>
              ) : (
                <span>0</span>
              )}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCommunity;
