import { useContext } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";

const CreateCommunity = () => {
  {
    document.title = "Create Community | Travigo";
  }
  const { user } = useContext(AuthContext);

  const handleCreateCommunity = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const image = form.image.value;
    const adminName = form.adminName.value;
    const adminEmail = form.adminEmail.value;
    const details = form.details.value;

    const CommunityInfo = {
      name,
      image,
      adminName,
      adminEmail,
      details,
    };

    fetch("http://localhost:5000/allCommunities", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(CommunityInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          Swal.fire({
            icon: "success",
            title: "Your lego has been added!",
            showConfirmButton: true,
            timer: 1500,
          });
          form.reset();
        }
      });
  };
  return (
    <div className="mb-20 mt-10">
      <h1 className="text-5xl text-center font-bold">Create a Community</h1>
      <div className="my-5">
        <form onSubmit={handleCreateCommunity} className="w-full mx-auto grid">
          <div className="form-control w-[100%] col-span-2">
            <label className="label">
              <span className="label-text font-bold">Community Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Community Name"
              className="input input-bordered w-[90%]"
              required
            />
          </div>
          <div className="form-control w-[100%] col-span-2">
            <label className="label">
              <span className="label-text font-bold">Cover Image URL</span>
            </label>
            <input
              name="image"
              type="text"
              placeholder="Cover Image URL"
              className="input input-bordered w-[90%]"
              required
            />
          </div>
          <div className="form-control w-[100%] col-span-2">
            <label className="label">
              <span className="label-text font-bold">Admin Name</span>
            </label>
            <input
              name="adminName"
              type="text"
              placeholder="Admin Name"
              value={user?.displayName}
              className="input input-bordered w-[90%]"
              readOnly
            />
          </div>
          <div className="form-control w-[100%] col-span-2">
            <label className="label">
              <span className="label-text font-bold">Admin Email</span>
            </label>
            <input
              name="adminEmail"
              type="email"
              placeholder="Admin Email"
              className="input input-bordered w-[90%]"
              value={user?.email}
              readOnly
            />
          </div>

          <div className="form-control w-[100%] col-span-2">
            <label className="label">
              <span className="label-text font-bold">Detail Description</span>
            </label>
            <input
              name="details"
              type="text"
              placeholder="Detail Description"
              className="input input-bordered input-lg w-[90%]"
            />
          </div>
          <div className="form-control mx-auto col-span-2 mt-4">
            <input
              className="cursor-pointer btn"
              type="submit"
              value="Create a Community"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunity;
