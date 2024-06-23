import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import UserContext from "../../assets/context/UserContext";

function Login() {
  
  const navigate = useNavigate();
  useEffect(()=>{
    const user=localStorage.getItem("data")
    if(user){
        navigate('/')
    }
  },[navigate])

  const {login}=useContext(UserContext)
  const [isLoading,setIsLoading] = useState(false)
  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {

      if(!email || !password){
        return toast.error("All fields are required");
      }

      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });
      login(res)
      toast.success(res?.data?.message);
      setTimeout(()=>{
        navigate("/")
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
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <h1 className="text-3xl">Login</h1>
          <input className="p-5 border border-gray-600 rounded" name="email" type="text" placeholder="Email" />
          <input className="p-5 border border-gray-600 rounded" name="password" type="password" placeholder="Password" />
          <button className="p-5 rounded bg-teal-700 text-white font-bold cursor-pointer disabled:bg-[#bed9d8] disabled:cursor-not-allowed" disabled={isLoading}>Login</button>
          <Link className="text-blue-500 hover:text-blue-700" to="/register">Don't you have an account?</Link>
        </form>
      </div>
      <div className="hidden sm:flex flex-[2] bg-[#fcf5f3] items-center justify-center">
        <img className="w-full" src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
