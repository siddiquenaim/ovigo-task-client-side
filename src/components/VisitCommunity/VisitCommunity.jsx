import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import SinglePost from "./SinglePost";

const VisitCommunity = () => {
  const { user } = useContext(AuthContext);
  const community = useLoaderData();
  const [communityPosts, setCommunityPosts] = useState([]);
  // console.log(user);

  //   submit a post

  const handleNewPost = (event) => {
    event.preventDefault();
    const form = event.target;
    const text = form?.post?.value;
    const postInfo = {
      userName: user?.displayName,
      userEmail: user?.email,
      communityID: community?._id,
      communityName: community?.name,
      image: user?.photoURL,
      text,
    };

    fetch("https://ovigo-task-server-side.vercel.app/post-in-community", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data?.acknowledged) {
          Swal.fire({
            icon: "success",
            title: "Posted Successfully",
            showConfirmButton: true,
            timer: 1500,
          });
          form.reset();
        }
      });
  };

  //   view posts

  useEffect(() => {
    fetch(
      `https://ovigo-task-server-side.vercel.app/view-posts/${community._id}`
    )
      .then((res) => res.json())
      .then((data) => setCommunityPosts(data));
  }, [community._id, communityPosts]);

  return (
    <div>
      <h2 className="text-center text-3xl mt-20 mb-10">
        Welcome to {community.name}
      </h2>
      <form className="text-center" onSubmit={handleNewPost}>
        <input
          name="post"
          type="text"
          placeholder="What's on your mind?"
          className="input input-bordered input-lg w-full max-w-xs"
          required
        />
        <input
          type="submit"
          className="btn bg-[#021817] text-white hover:bg-[#0218179c] block mt-3 text-center mx-auto"
          value="Post"
        />
      </form>

      {/* community posts */}
      <div className="px-10 pt-10 pb-20">
        <h1 className="text-center mb-10 text-3xl">All Community Posts</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
          {communityPosts.map((post) => (
            <SinglePost key={post._id} post={post}></SinglePost>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisitCommunity;
