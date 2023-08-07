import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllCommunities = () => {
  const [allCommunities, setAllCommunities] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/allCommunities")
      .then((res) => res.json())
      .then((data) => setAllCommunities(data));
  }, []);
  return (
    <div>
      <h1 className="text-3xl text-center mb-10 mt-20">All Communities</h1>
      <div className="overflow-x-scroll lg:overflow-x-auto">
        <table className="table w-[90%] lg:w-[90%] mx-auto">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Admin</th>
              <th>Community</th>
              <th>Number of Members</th>

              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {allCommunities.map((community, i) => (
              <tr key={community._id}>
                <th>{i + 1}</th>
                <td>{community?.adminName}</td>
                <td>{community?.name}</td>
                <td>{community?.members ? community?.members?.length : 0}</td>

                <td>
                  <Link to={`/community-details/${community?._id}`}>
                    <button className="btn">View Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCommunities;
