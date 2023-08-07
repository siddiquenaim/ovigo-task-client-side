import React, { useEffect, useState } from "react";

const MemberCard = (props) => {
  const mail = props?.mail;
  const userEmail = props?.userEmail;

  const [member, setMember] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/findUser/${mail}`)
      .then((res) => res.json())
      .then((data) => setMember(data));
  }, [mail]);

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img src={member?.photo} className="w-[300px] h-[200px]" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{member?.name}</h2>
        <p>{member?.email}</p>
        <div className="card-actions justify-end">
          {userEmail === mail ? (
            <p>Admin</p>
          ) : (
            <button className="btn btn-error">Remove Member</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
