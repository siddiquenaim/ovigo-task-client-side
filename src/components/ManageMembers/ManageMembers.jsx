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
    <div>
      <h1>The members of your community</h1>
      <h2>Total Members: {userCommunity?.members?.length}</h2>
      {userCommunity?.members?.map((member, i) => (
        <MemberCard key={i} mail={member}></MemberCard>
      ))}
    </div>
  );
};

export default ManageMembers;
