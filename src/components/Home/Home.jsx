import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import SinglePost from "../VisitCommunity/SinglePost";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  // find user data

  useEffect(() => {
    fetch(`http://localhost:5000/joinedCommunities?userEmail=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setJoinedCommunities(data.communities));
  }, [user?.email]);

  // find all posts

  useEffect(() => {
    fetch("http://localhost:5000/all-posts")
      .then((res) => res.json())
      .then((data) => setAllPosts(data));
  }, []);

  let joinedPosts = [];
  for (let post of allPosts) {
    if (joinedCommunities.includes(post.communityID)) {
      joinedPosts.push(post);
    }
  }

  console.log("joinedPosts:", joinedPosts);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 m-10">
        {joinedPosts.map((post) => (
          <SinglePost key={post._id} post={post}></SinglePost>
        ))}
      </div>
    </div>
  );
};

export default Home;
