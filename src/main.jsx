import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout/HomeLayout.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import AuthProvider from "./provider/AuthProvider/AuthProvider.jsx";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout.jsx";
import DashboardHome from "./components/DashboardHome/DashboardHome.jsx";
import UserCommunity from "./components/UserCommunity/UserCommunity.jsx";
import CreateCommunity from "./components/CreateCommunity/CreateCommunity.jsx";
import AllCommunities from "./components/AllCommunities/AllCommunities.jsx";
import CommunityDetails from "./components/CommunityDetails/CommunityDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "all-communities",
        element: <AllCommunities></AllCommunities>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "/community-details/:id",
        element: <CommunityDetails></CommunityDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/allCommunities/${params.id}`),
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "user-community",
        element: <UserCommunity></UserCommunity>,
      },
      {
        path: "user-community/create-community",
        element: <CreateCommunity></CreateCommunity>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {" "}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
