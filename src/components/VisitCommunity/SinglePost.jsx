import React from "react";

const SinglePost = ({ post }) => {
  const { userName, userEmail, communityName, text } = post;
  return (
    <div className="card w-full border bg-white text-black">
      <div className="card-body">
        <h2 className="card-title">{userName}</h2>
        <p className="text-sm">{communityName}</p>
        <p className="mt-4 text-xl"> {text}</p>
      </div>
    </div>
  );
};

export default SinglePost;
