import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";

const NewPassword = () => {
  const params = useParams();
  const { token } = params;
  const URL = `${import.meta.env.VITE_REACT_APP_CONNECTION_HOST}/api/veterinarios/forget-password/${token}`;

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [tokenStatus, setTokenStatus] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [alert, setAlert] = useState({ msg: "", error: false });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await axios.get(URL);

        if (data) {
          setTokenStatus(true);
          setAlert({ msg: data.msg });
        }
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    };

    verifyToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if ([password, repeatPassword].includes("")) {
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

      const { data } = await axios.post(URL, { token, password });
      if (data) {
        setPasswordChanged(true);
        setAlert({ msg: data.msg });
      }
    } catch (error) {
      // CREATE USER
      console.log(error);

      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alert;

  return (
    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-6xl ">
          Reset your password and don’t lose access to your{" "}
          <span className="text-black"> patients.</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}
        {tokenStatus ? (
          <form action="" onSubmit={handleSubmit}>
            <div className="my-5">
              <label
                htmlFor="password"
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                New password
              </label>
              <input
                type="password"
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
                type="password"
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
              value="Save new password"
              className="bg-indigo-700 w-full py-3 px-10
                rounded-xl text-white uppercase font-bold mt-5
                hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />

            <div className="mt-10 lg:flex lg:justify-around text-xl">
              {passwordChanged && <Link to="/" className="block text-center my-5 text-gray-500">
                Log in!
              </Link>}
            </div>
          </form>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default NewPassword;
