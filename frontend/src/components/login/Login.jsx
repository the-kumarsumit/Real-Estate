import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="h-full flex">
      <div className="flex flex-[3] h-full items-center justify-center">
        <form className="flex flex-col gap-5">
          <h1 className="text-3xl">Login</h1>
          <input className="p-5 border border-gray-600 rounded" name="email" type="text" placeholder="Email" />
          <input className="p-5 border border-gray-600 rounded" name="password" type="password" placeholder="Password" />
          <button className="p-5 rounded bg-teal-700 text-white font-bold cursor-pointer disabled:bg-[#bed9d8] disabled:cursor-not-allowed">Login</button>
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
