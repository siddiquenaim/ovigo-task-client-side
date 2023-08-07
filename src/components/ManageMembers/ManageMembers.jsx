import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import MemberCard from "./MemberCard";

const ManageMembers = () => {
  const { user } = useContext(AuthContext);
  const [userCommunity, setUserCommunity] = useState([]);

  const url = `http://localhost:5000/userCommunity?userEmail=${user?.email}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserCommunity(data[0]));
  });
  return (
    <div className="p-4">
      <h1 className="text-center text-4xl mb-3">
        The members of your community
      </h1>
      <h2 className="text-center text-xl font-semibold">
        Total Members: {userCommunity?.members?.length}
      </h2>
      <div className="my-10 grid gap-4 grid-cols-1 lg:grid-cols-4">
        {userCommunity?.members?.map((member, i) => (
          <MemberCard
            key={i}
            mail={member}
            userEmail={user?.email}
          ></MemberCard>
        ))}
      </div>
    </div>
  );
};

export default ManageMembers;
