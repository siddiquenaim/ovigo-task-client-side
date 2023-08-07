import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import SinglePost from "../VisitCommunity/SinglePost";
import Banner from "../Banner/Banner";
import JoinCommunities from "../JoinCommunities/JoinCommunities";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [joinedPosts, setJoinedPosts] = useState([]);
  const [userCommunity, setUserCommunity] = useState([]);
  const [userCommunityPosts, setUserCommunityPosts] = useState([]);

  const url = `https://ovigo-task-server-side.vercel.app/userCommunity?userEmail=${user?.email}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserCommunity(data[0]));
  }, [url]);

  // console.log(userCommunity);

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

  // find all posts

  useEffect(() => {
    fetch("https://ovigo-task-server-side.vercel.app/all-posts")
      .then((res) => res.json())
      .then((data) => setAllPosts(data));
  }, [user, joinedCommunities]);

  useEffect(() => {
    if (joinedCommunities) {
      // console.log(joinedCommunities);
      let filteredPosts = allPosts.filter((post) =>
        joinedCommunities.includes(post.communityID)
      );
      setJoinedPosts(filteredPosts);
    }
  }, [allPosts, joinedCommunities]);

  useEffect(() => {
    fetch(
      `https://ovigo-task-server-side.vercel.app/view-posts/${userCommunity?._id}`
    )
      .then((res) => res.json())
      .then((data) => setUserCommunityPosts(data));
  }, [userCommunity?._id, joinedPosts]);

  return (
    <div>
      <Banner></Banner>

      {user && (
        <>
          <h1 className="text-center text-3xl mt-10">Community Posts</h1>
          {joinedPosts.length === 0 && (
            <p className="my-10 text-center">
              Please join more active communities.
            </p>
          )}
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 m-10">
              {joinedPosts.map((post) => (
                <SinglePost key={post._id} post={post}></SinglePost>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 m-10">
              {userCommunityPosts.map((post) => (
                <SinglePost key={post._id} post={post}></SinglePost>
              ))}
            </div>
          </>
        </>
      )}

      {user && <JoinCommunities></JoinCommunities>}
    </div>
  );
};

export default Home;
