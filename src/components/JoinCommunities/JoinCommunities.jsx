import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import CommunityCard from "./CommunityCard";

const JoinCommunities = () => {
  const { user } = useContext(AuthContext);

  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [allCommunities, setAllCommunities] = useState([]);
  const [suggestedCommunities, setSuggestedCommunities] = useState([]);

  // find user data
  useEffect(() => {
    fetch(
      `https://ovigo-task-server-side.vercel.app/joinedCommunities?userEmail=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setJoinedCommunities(data.communities);
      });
  }, [user?.email]);

  //   all communities
  useEffect(() => {
    fetch("https://ovigo-task-server-side.vercel.app/allCommunities")
      .then((res) => res.json())
      .then((data) => setAllCommunities(data));
  }, []);

  //   filter not joined communities

  useEffect(() => {
    let notJoinedCommunities = [];
    if (joinedCommunities) {
      // Check if joinedCommunities is not undefined
      for (let community of allCommunities) {
        if (!joinedCommunities.includes(community._id)) {
          notJoinedCommunities.push(community);
        }
      }
    }

    setSuggestedCommunities(notJoinedCommunities);
    // console.log(notJoinedCommunities);
  }, [allCommunities, joinedCommunities]);

  return (
    <div className="py-20">
      <h1 className="text-center text-3xl">Other Communities</h1>
      {suggestedCommunities.length === 0 ? (
        <p className="my-10 text-center">
          You have joined all the communities!
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 mx-10">
          {suggestedCommunities.map((singleCommunity) => (
            <CommunityCard
              key={singleCommunity._id}
              singleCommunity={singleCommunity}
            ></CommunityCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinCommunities;
