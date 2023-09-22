import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alert, setAlert] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, repeatPassword].includes("")) {
      return setAlert({
        msg: "Please fill out all the required fields.",
        error: true,
      });
    }
    if (password.length < 8 || password.length > 12) {
      return setAlert({
        msg: "Password must be between 8 and 12 characters.",
        error: true,
      });
    }

    if (password !== repeatPassword) {
      return setAlert({ msg: "Passwords doenst match.", error: true });
    }

    setAlert({});

    // CREATE USER

    try {
      const URL = "http://localhost:4000/api/veterinarios";
      await axios.post(URL, { name, email, password });
      setAlert({ msg: "User Created! Check your email", error: false });

      setTimeout(() => {
        setAlert({})
        setName("")
        setEmail("")
        setPassword("")
        setRepeatPassword("")
      }, 3000);

    } catch (error) {
      setAlert({msg:error.response.data.msg, error:true})
    }
  };

  const {msg} = alert

  return (
    <>
      <h1 className="text-indigo-600 font-black text-6xl">
        Create your account and manage your{" "}
        <span className="text-black">patients.</span>
      </h1>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white ">
        {msg && msg ? <Alert alert={alert} /> : ""}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor="name"
              className="uppercase text-gray-600 block text-xl font-bold"
              value={name}
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
            />
          </div>

          <div className="my-5">
            <label
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Email
            </label>
            <input
              type="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
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
              type="text"
              placeholder="Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Repeat your password
            </label>
            <input
              type="text"
              placeholder="Repeat your password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
            />
          </div>
          <input
            type="submit"
            value="Create account"
            className="bg-indigo-700 w-full py-3 px-10
                  rounded-xl text-white uppercase font-bold mt-5
                  hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <div className="mt-10 lg:flex lg:justify-around">
          <Link to="/" className="block text-center my-5 text-gray-500">
            Already have an account ? Log in!
          </Link>
          <Link
            to="/forgot-password"
            className="block text-center my-5 text-gray-500"
          >
            {" "}
            Forgot password?
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
