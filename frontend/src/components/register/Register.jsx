import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import OtpInput from "../otpInput/OtpInput";
import UserContext from "../../context/UserContext";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [verify, setVerify] = useState(true);
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };
  const handleOtpGenerate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!username || !email || !password || !confirmPassword) {
        return toast.error("All fields are required");
      }
      if (password != confirmPassword) {
        return toast.error("Password not Matched");
      }
      const res = await axios.post("http://localhost:8000/api/auth/generateOtp", {
        username,
        email,
      });
      toast.success(res?.data?.message);
      setTimeout(() => {
        setVerify(false);
      }, 3000);
    } catch (err) {
      console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      return toast.error("Please fill the OTP");
    }
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", {
        username,
        email,
        password,
        confirmPassword,
        otp,
      });
      toast.success(res?.data?.message);
      setTimeout(() => {
        navigate("/login");
      }, 3500);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-full flex">
      <div className="flex flex-[3] h-full items-center justify-center">
        <form
          onSubmit={verify ? handleOtpGenerate : handleSubmit}
          className="flex flex-col gap-5"
        >
          {verify ? (
            <>
              <h1 className="text-3xl">Create an Account</h1>
              <input
                className="p-5 border border-gray-600 rounded"
                name="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Username"
              />
              <input
                className="p-5 border border-gray-600 rounded"
                name="email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
              />
              <input
                className="p-5 border border-gray-600 rounded"
                name="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
              <input
                className="p-5 border border-gray-600 rounded"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                placeholder="Confirm Password"
              />
              <button
                className="p-5 rounded bg-teal-700 text-white font-bold cursor-pointer disabled:bg-[#bed9d8] hover:text-xl disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Register
              </button>
              <Link className="text-blue-500 hover:text-blue-700" to="/login">
                Do you have an account?
              </Link>
            </>
          ) : (
            <div className="items-center text-center">
              <h2 className="text-3xl text-start font-light p-2">Enter OTP</h2>
              <OtpInput length={6} onChange={handleOtpChange} />
              <button
                className="text-white text-center bg-slate-500 hover:bg-slate-600 hover:scale-110 hover:ease-linear w-5/6 p-2 my-2 hover:text-xl rounded"
                type="submit"
              >
                Verify OTP
              </button>
            </div>
          )}
        </form>
      </div>
      <div className="hidden sm:flex flex-[2] bg-[#fcf5f3] items-center justify-center">
        <img className="w-full h-full object-cover" src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
