import React, { useContext, useEffect, useState } from "react";
import CommunityRow from "./CommunityRow";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";

const JoinedCommunities = () => {
  const { user } = useContext(AuthContext);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/joinedCommunities?userEmail=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.communities);
        setJoinedCommunities(data.communities);
      });
  }, [user?.email]);

  return (
    <div>
      <h1 className="text-3xl text-center mb-10 mt-20">Joined Communities</h1>
      <div className="overflow-x-scroll lg:overflow-x-auto">
        <table className="table w-[90%] lg:w-full mx-auto">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Admin</th>
              <th>Community</th>
              <th>Number of Members</th>
              <th>Number of Posts</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {joinedCommunities?.map((community, i) => (
              <CommunityRow
                key={community}
                i={i}
                community={community}
              ></CommunityRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JoinedCommunities;
