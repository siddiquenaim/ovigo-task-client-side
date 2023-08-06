import React from "react";
import { useLoaderData } from "react-router-dom";

const CommunityDetails = () => {
  const { name, adminName, adminEmail, totalPost, totalUser, image } =
    useLoaderData();
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
            Total User: {totalUser ? <span>${totalUser}</span> : <span>0</span>}
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
          <button className="btn">Join Community</button>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetails;
