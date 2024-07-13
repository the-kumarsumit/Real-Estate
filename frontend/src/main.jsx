import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout, RequireAuth } from "./Layout.jsx";
import AboutUs from "./components/about/AboutUs.jsx";
import ContactUs from "./components/contact/ContactUs.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import HomePage from "./components/homepage/HomePage.jsx";
import Listpage from "./components/listpage/Listpage.jsx";
import SinglePage from "./components/singlepage/SinglePage.jsx";
import Profile from "./components/profile/Profile.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import ProfileUpdate from "./components/profileUpdate/ProfileUpdate.jsx";
import NewPost from "./components/newPost/NewPost.jsx";
import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from "./lib/loaders.js";
import { SocketContextProvider } from "./context/SocketContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="about" element={<AboutUs />} />x
        <Route path="contact" element={<ContactUs />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="list" loader={listPageLoader} element={<Listpage />} />
        <Route path=":id" loader={singlePageLoader} element={<SinglePage />} />
      </Route>
      <Route path="/" element={<RequireAuth />}>
        <Route
          path="profile"
          loader={profilePageLoader}
          element={<Profile />}
        />
        <Route path="profile/update" element={<ProfileUpdate />} />
        <Route path="add" element={<NewPost />} />
      </Route>
    </>
  )
);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "",
//         element: <HomePage />,
//       },
//       {
//         path: "about",
//         element: <AboutUs />,
//       },
//       {
//         path: "contact",
//         element: <ContactUs />,
//       },
//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "register",
//         element: <Register />,
//       },
//       {
//         path: "list",
//         element: <Listpage />,
//       },
//       {
//         path: ":id",
//         element: <SinglePage />,
//       },
//     ],
//   },
//   {
//     path: "/",
//     element: <RequireAuth />,
//     children: [
//       {
//         path: "profile",
//         element: <Profile />,
//       },
//       {
//         path: "profile/update",
//         element: <ProfileUpdate />,
//       },
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <SocketContextProvider>
      <RouterProvider router={router} />
    </SocketContextProvider>
  </UserContextProvider>
);
