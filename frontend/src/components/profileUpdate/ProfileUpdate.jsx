import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";


function ProfileUpdate() {
  const { user, updateUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      let res = await axios.put(
        `http://localhost:8000/api/users/${user.id}`,
        {
          username,
          email,
          password,
          // avatar:avatar[0]
        },
        
      );
      // console.log(res);
      updateUser(res?.data?.userInfo);
      toast.success(res?.data?.message);
      setTimeout(()=>{
        navigate("/profile")
      },3500)
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex">
      <div className="flex flex-[3] h-full items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h1 className="text-3xl">Update Account Details</h1>
          <input
            className="p-5 border border-gray-600 rounded"
            name="username"
            type="text"
            placeholder="Username"
            defaultValue={user.username}
          />
          <input
            className="p-5 border border-gray-600 rounded"
            name="email"
            type="text"
            placeholder="Email"
            defaultValue={user.email}
          />
          <input
            className="p-5 border border-gray-600 rounded"
            name="password"
            type="password"
            placeholder="Password"
          />
          <button
            className="p-5 rounded bg-teal-700 text-white font-bold cursor-pointer disabled:bg-[#bed9d8] disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Update
          </button>
        </form>
      </div>
      <div className="hidden sm:flex flex-[2] bg-[#fcf5f3] items-center justify-center">
        <img className="w-4/5" src={user.avatar || "/noavatar.jpg"} alt="" />
      </div>
    </div>
  );
}

export default ProfileUpdate;
