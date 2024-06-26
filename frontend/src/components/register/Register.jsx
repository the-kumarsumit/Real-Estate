import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function Register() {
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate();
  useEffect(()=>{
    const user=localStorage.getItem("data")
    if(user){
        navigate('/')
    }
  },)
  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    try {

      if(!username || !email || !password || !confirmPassword){
        return toast.error("All fields are required");
      }
      if(password!=confirmPassword){
        return toast.error("Password not Matched")
      }

      const res = await axios.post("http://localhost:8000/api/auth/register", {
        username,
        email,
        password,
        confirmPassword,
      });
      toast.success(res?.data?.message);
      setTimeout(()=>{
        navigate("/login")
      },3500)
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false)
    }
  };
  return (
    <div className="h-full flex">
      <div className="flex flex-[3] h-full items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h1 className="text-3xl">Create an Account</h1>
          <input
            className="p-5 border border-gray-600 rounded"
            name="username"
            type="text"
            placeholder="Username"
          />
          <input
            className="p-5 border border-gray-600 rounded"
            name="email"
            type="text"
            placeholder="Email"
          />
          <input
            className="p-5 border border-gray-600 rounded"
            name="password"
            type="password"
            placeholder="Password"
          />
          <input
            className="p-5 border border-gray-600 rounded"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <button className="p-5 rounded bg-teal-700 text-white font-bold cursor-pointer disabled:bg-[#bed9d8] disabled:cursor-not-allowed" disabled={isLoading}>
            Register
          </button>
          <Link className="text-blue-500 hover:text-blue-700" to="/login">
            Do you have an account?
          </Link>
        </form>
      </div>
      <div className="hidden sm:flex flex-[2] bg-[#fcf5f3] items-center justify-center">
        <img className="w-full" src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
