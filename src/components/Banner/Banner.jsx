import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";

const Banner = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="md:flex text-center md:text-left w-[90%] mx-auto mt-20 mb-10">
      <div className="md:w-[50%] flex justify-center items-center mb-10 md:mb-0">
        <div className="md:w-[80%]">
          <div className="text-5xl">
            <h1>Welcome to Travigo</h1>
          </div>

          <br />

          <p className="my-5 text-[#333333]">
            Embark on unforgettable journeys and discover the world with
            Travigo, the ultimate haven for travel enthusiasts. Immerse yourself
            in a vibrant community that shares your wanderlust, where
            breathtaking landscapes, cultural experiences, and thrilling
            adventures await. Whether you're a seasoned globetrotter or an
            aspiring explorer, Travigo is your gateway to limitless inspiration,
            expert insights, and the camaraderie of fellow adventurers. Join us
            today and let your wanderlust thrive with Travigo, where every
            moment becomes an extraordinary travel tale.
          </p>

          {!user && (
            <p className="mb-5 text-2xl">
              Please Login to join different communities
            </p>
          )}

          {user ? (
            <Link to="all-communities">
              <button className="btn bg-[#021817] text-white hover:bg-[#02181759]">
                Start Now
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="btn bg-[#021817] text-white hover:bg-[#0218179c]">
                Start Now
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="md:w-[50%]">
        <lottie-player
          src="https://lottie.host/d81ab428-eb19-449a-8136-7ecb5ad3aee0/X4qF5Yfw4o.json"
          background="transparent"
          speed="1"
          className="h-[250px] w-[250px]"
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
  );
};

export default Banner;
