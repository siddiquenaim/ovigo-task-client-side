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
      <h1 className="text-3xl text-center">All Communities</h1>
      <div className="overflow-x-auto">
        <table className="table w-[90%] lg:w-[90%] mx-auto">
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
            {allCommunities.map((community, i) => (
              <tr key={community._id}>
                <th>{i + 1}</th>
                <td>{community?.adminName}</td>
                <td>{community?.name}</td>
                <td>{community?.totalUser ? community?.totalUser : 0}</td>
                <td>{community?.totalPost ? community?.totalPost : 0}</td>

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