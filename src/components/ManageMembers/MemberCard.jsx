import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const MemberCard = (props) => {
  const mail = props?.mail;
  const userEmail = props?.userEmail;
  const community = props?.userCommunity;

  const [member, setMember] = useState({});
  useEffect(() => {
    fetch(`https://ovigo-task-server-side.vercel.app/findUser/${mail}`)
      .then((res) => res.json())
      .then((data) => setMember(data));
  }, [mail]);

  const handleRemoveMember = (email) => {
    Swal.fire({
      title: `Are you sure to Remove ${member?.name}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Remove ${member?.name}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://ovigo-task-server-side.vercel.app/leaveCommunity/${community._id}`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire("Removed!", "Member has been removed.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img
          src={member?.photo}
          className="w-[300px] h-[200px]"
          alt="Member Image"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{member?.name}</h2>
        <p>{member?.email}</p>
        <div className="card-actions justify-end">
          {userEmail === mail ? (
            <p>Admin</p>
          ) : (
            <button
              onClick={() => handleRemoveMember(member?.email)}
              className="btn bg-red-600 text-white hover:bg-slate-300 hover:text-black normal-case"
            >
              Remove Member
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
