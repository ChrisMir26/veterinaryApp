import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-6xl ">
          Recover your access and don't lose your{" "}
          <span className="text-black"> patients. </span>
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
              type="email"
              placeholder="Email"
              className="border w-full p-3 mt-2 bg-gray-50 rounded-xl "
            />
          </div>
          <input
            type="submit"
            value="Recover account"
            className="bg-indigo-700 w-full py-3 px-10
                  rounded-xl text-white uppercase font-bold mt-5
                  hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <div className="mt-10 lg:flex lg:justify-around">
          <Link to="/" className="block text-center my-5 text-gray-500">
            Already have an account  ? Log in!
          </Link>
          <Link to="/sign-up" className="block text-center my-5 text-gray-500">
            Don't have an account yet? Sign up!
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
