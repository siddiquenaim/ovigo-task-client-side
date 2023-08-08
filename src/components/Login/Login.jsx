import React, { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showError, setShowError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    logIn(email, password)
      .then((result) => {
        // console.log(result);
        Swal.fire({
          icon: "success",
          title: "Logged in Successfully",
          showConfirmButton: true,
          timer: 1500,
        });
        setShowError("");
        navigate("/");
        form.reset();
      })
      .catch((error) => setShowError(error.message));
  };

  return (
    <div className="hero min-h-screen bg-base-200 py-20">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left lg:w-[50%] mx-auto">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6 w-[75%] mx-auto lg:w-full">
            Ready to set off on new horizons? Login now and embark on a journey
            of connection, where you can meet fellow travelers who share your
            passion and curiosity. Forge friendships, swap tales, and explore
            the world through the eyes of like-minded adventurers. Join us in
            creating a global network of wanderers and seekers. Login today to
            begin your travel-inspired adventure!
          </p>
        </div>
        <div className="lg:w-[50%] mx-auto card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>
            <p className="text-red-600">{showError && showError.slice(9)}</p>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <div>
              <p className="text-center mt-3 font-semibold">
                New to Travigo?{" "}
                <Link to="/register" className="text-blue-600">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
