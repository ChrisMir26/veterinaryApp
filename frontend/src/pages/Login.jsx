import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-6xl ">
        Log in to your account and manage your {" "}
          <span className="text-black"> patients</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white ">
        <form action="">
          <div className="my-5">
            <label
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              className="border w-full p-3 mt-2 bg-gray-50 rounded-xl "
            />
          </div>
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
            />
          </div>

          <input
            type="submit"
            value="Log in"
            className="bg-indigo-700 w-full py-3 px-10
                  rounded-xl text-white uppercase font-bold mt-5
                  hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <div className="mt-10 lg:flex lg:justify-around">
          <Link to="/sign-up" className="block text-center my-5 text-gray-500">
            Don't have an account yet? Sign up!
          </Link>
          <Link
            to="/forgot-password"
            className="block text-center my-5 text-gray-500"
            > Forgot password?
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
