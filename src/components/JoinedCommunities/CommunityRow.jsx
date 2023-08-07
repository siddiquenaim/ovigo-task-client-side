import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CommunityRow = (props) => {
  const [community, setCommunity] = useState();
  const communityID = props.community;
  const i = props.i;

  useEffect(() => {
    fetch(`http://localhost:5000/allCommunities/${communityID}`)
      .then((res) => res.json())
      .then((data) => setCommunity(data));
  }, []);

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{community?.adminName}</td>
      <td>{community?.name}</td>
      <td>{community?.members ? community?.members?.length : 0}</td>
      <td>{community?.totalPost ? community?.totalPost : 0}</td>

      <td>
        <Link to={`/community-details/${community?._id}`}>
          <button className="btn">View Details</button>
        </Link>
      </td>
    </tr>
  );
};

export default CommunityRow;
