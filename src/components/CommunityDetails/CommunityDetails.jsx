import React, { useContext } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const CommunityDetails = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const {
    _id,
    name,
    adminName,
    adminEmail,
    totalPost,
    image,
    members,
    details,
  } = useLoaderData();
  const navigate = useNavigate();

  const handleJoinCommunity = () => {
    fetch(`https://ovigo-task-server-side.vercel.app/joinCommunity/${_id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          fetch(`https://ovigo-task-server-side.vercel.app/updateUser/${_id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ userEmail }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.modifiedCount > 0) {
                Swal.fire({
                  icon: "success",
                  title: `You have joined ${name}`,
                  showConfirmButton: true,
                  timer: 1500,
                });
                navigate(`/visit-community/${_id}`);
              }
            });
        }
      });
  };

  const alreadyJoined = members.includes(userEmail);
  // console.log(alreadyJoined);

  return (
    <div className="lg:flex justify-center my-20 text-center lg:text-start">
      <div className="lg:w-[50%] mx-auto max-h-[300px] max-w-[300px]">
        <img src={image} alt="" />
      </div>
      <div className="lg:w-[50%] mx-auto">
        <h1 className="text-2xl mb-5 font-semibold mt-5 lg:mt-0">{name}</h1>
        <div className="space-y-3">
          <p>
            {" "}
            <span className="font-semibold">Admin Name:</span> {adminName}
          </p>
          <p>
            {" "}
            <span className="font-semibold">Admin Email:</span> {adminEmail}
          </p>
          <p>
            {" "}
            <span className="font-semibold">Description:</span> {details}
          </p>
          <p>
            <span className="font-semibold">Total Member:</span>{" "}
            {members ? <span>{members.length}</span> : <span>0</span>}
          </p>

          <div>
            <button
              className="btn"
              onClick={handleJoinCommunity}
              disabled={alreadyJoined}
            >
              {alreadyJoined ? "Already Joined" : "Join Community"}
            </button>

            {alreadyJoined && (
              <Link to={`/visit-community/${_id}`}>
                <button className="btn bg-[#021817] text-white hover:bg-[#0218179c] ml-2">
                  Visit Community
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetails;
