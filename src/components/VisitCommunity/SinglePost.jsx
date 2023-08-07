import React from "react";

const SinglePost = ({ post }) => {
  const { userName, userEmail, communityName, text, image } = post;
  return (
    <div className="card w-full border bg-white text-black">
      <div className="card-body">
        <div className="flex  items-center gap-3">
          <div className="avatar h-[60px] w-[60px]">
            <div className="w-24 rounded-full">
              <img src={image} />
            </div>
          </div>
          <div>
            <h2 className="card-title">{userName}</h2>
            <p className="text-sm">{communityName}</p>
          </div>
        </div>
        <p className="mt-4 text-xl"> {text}</p>
      </div>
    </div>
  );
};

export default SinglePost;
