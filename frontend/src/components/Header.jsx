import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usePatients from "../hooks/usePatients";

const Header = () => {
  const { logOut, user } = useAuth();

  return (
    <header className="py-5 bg-indigo-600">
      <div className="container mx-auto  flex flex-col lg:flex-row justify-between items-center">
        <Link to={"/admin"} className="text-white text-sm uppercase font-bold">
          {" "}
          <h1 className="font-bold text-2xl text-indigo-200 text-center">
            Administrador de pacientes de {""}{" "}
            <span className="text-white">veterinary</span>
          </h1>
        </Link>
        <nav className="flex gap-4 my-5 lg:my-0 ">
          <Link
            to={"/admin"}
            className="text-white text-sm uppercase font-bold"
          >
            Patients
          </Link>
          <Link
            to={"/admin/profile"}
            className="text-white text-sm uppercase font-bold"
          >
            Profile
          </Link>
          <button
            className="text-white text-sm uppercase font-bold"
            type="button"
            onClick={logOut}
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
