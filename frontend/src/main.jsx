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
import { UserProvider } from "./context/UserContext.jsx";
import ProfileUpdate from "./components/profileUpdate/ProfileUpdate.jsx";

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<HomePage/>}/>
      <Route path='about' element={<AboutUs/>}/>x
      <Route path='contact' element={<ContactUs/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='list' element={<Listpage/>}/>
      <Route path=':id' element={<SinglePage/>}/>
    </Route>
    <Route path='/' element={<RequireAuth/>}>
      <Route path='profile' element={<Profile/>}/>
      <Route path='profile/update' element={<ProfileUpdate/>}/>
    </Route>
    </>
  )
)

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
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
