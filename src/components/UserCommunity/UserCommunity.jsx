import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";

const UserCommunity = () => {
  const { user } = useContext(AuthContext);
  const [userCommunity, setUserCommunity] = useState([]);

  const url = `https://ovigo-task-server-side.vercel.app/userCommunity?userEmail=${user?.email}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserCommunity(data[0]));
  });

  // console.log(userCommunity);

  return (
    <div className="text-center">
      {!userCommunity ? (
        <>
          <h1 className="text-2xl">You haven't created a community yet</h1>
          <div className="my-4 text-center">
            <Link to="create-community">
              <button className="btn">Create Your Community</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center">{userCommunity?.name}</h1>
          <div className="mt-10 justify-center gap-5">
            <div className="mx-auto">
              <img
                src={userCommunity?.image}
                className="h-[400px] w-[600px]"
                alt=""
              />
            </div>
            <div className="mx-auto mt-5 text-2xl space-y-2">
              <p>
                <span className="font-semibold">Admin Name:</span>{" "}
                {userCommunity?.adminName}
              </p>
              <p>
                {" "}
                <span className="font-semibold">Admin Email:</span>{" "}
                {userCommunity?.adminEmail}
              </p>
              <p>
                <span className="font-semibold">Total User:</span>{" "}
                {userCommunity?.members ? (
                  <span>{userCommunity?.members.length}</span>
                ) : (
                  <span>0</span>
                )}
              </p>
              <Link to={`/visit-community/${userCommunity?._id}`}>
                <button className="btn bg-[#021817] text-white hover:bg-[#0218179c] mt-3">
                  Visit Community
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCommunity;
