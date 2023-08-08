import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const { error, status } = useRouteError();

  return (
    <section className="flex items-center h-screen p-16 bg-[#F9F9F6] text-gray-900">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <lottie-player
          src="https://assets3.lottiefiles.com/packages/lf20_suhe7qtm.json"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay
        ></lottie-player>
        <div className="max-w-md text-center">
          <h2 className="text-[#CF102D] mb-8 font-extrabold text-9xl">
            <span className="sr-only ">Error</span> {status || 404}
          </h2>
          <p className="text-2xl font-semibold md:text-3xl mb-8">
            {error?.message}
          </p>
          <Link to="/">
            <button className="btn bg-[#021817] text-white hover:bg-[#0218179c] border-none mr-5">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
