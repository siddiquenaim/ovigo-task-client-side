import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const CommunityDetails = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const { _id, name, adminName, adminEmail, totalPost, image, members } =
    useLoaderData();

  const handleJoinCommunity = () => {
    fetch(`http://localhost:5000/joinCommunity/${_id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          fetch(`http://localhost:5000/updateUser/${_id}`, {
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
              }
            });
        }
      });
  };

  const alreadyJoined = members.includes(userEmail);
  console.log(alreadyJoined);

  return (
    <div className="lg:flex justify-center my-20">
      <div className="lg:w-[50%] mx-auto max-h-[300px] max-w-[300px]">
        <img src={image} alt="" />
      </div>
      <div className="lg:w-[50%] mx-auto">
        <h1 className="text-2xl mb-5">{name}</h1>
        <div className="space-y-2">
          <p>Admin Name: {adminName}</p>
          <p> Admin Email: {adminEmail}</p>
          <p>
            Total User:{" "}
            {members ? <span>{members.length}</span> : <span>0</span>}
          </p>
          <p>
            Total Post:{" "}
            {totalPost ? (
              <>
                <span>${totalPost}</span>{" "}
                <button className="btn">Manage User</button>
              </>
            ) : (
              <span>0</span>
            )}
          </p>
          <button
            className="btn"
            onClick={handleJoinCommunity}
            disabled={alreadyJoined}
          >
            {alreadyJoined ? "Already Joined" : "Join Community"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetails;
