import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";

const CommunityCard = ({ singleCommunity }) => {
  const { user } = useContext(AuthContext);
  const { _id, adminEmail, adminName, details, image, name, members } =
    singleCommunity;
  return (
    <div className="card card-side bg-base-100 shadow-xl w-full">
      <figure>
        <img
          src={image}
          className="h-[350px] w-[350px]"
          alt="Community Image"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        {user.email === adminEmail && <p>Your Community</p>}
        <p>{details}</p>
        <p>
          <span className="font-semibold">Admin:</span> {adminName}
        </p>
        <p>
          <span className="font-semibold">Total Members:</span> {members.length}
        </p>
        <div className="card-actions justify-end">
          <Link to={`/community-details/${_id}`}>
            <button className="btn">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
