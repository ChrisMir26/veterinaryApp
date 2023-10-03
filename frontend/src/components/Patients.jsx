import { useEffect } from "react";
import usePatients from "../hooks/usePatients";
import useAuth from "../hooks/useAuth";

const Patients = ({ patient }) => {
  const { name, owner, email, date, symptoms, _id } = patient;
  const {editPatient,deletePatient} = usePatients()
  const {user} = useAuth()

  const formattedDate = (date) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
      newDate
    );
  }

  useEffect(()=>{

  },[])

  return (
    <div className="mx-5 my-5 bg-white shadow-md px-5 py-8 rounded-xl">
      <p className="font-bold uppercase my-1 text-indigo-800">
        Pet Name:
        <span className="font-normal normal-case text-black ml-2">{name}</span>
      </p>
      <p className="font-bold uppercase text-indigo-800 my-2 ">
        Owner Name:
        <span className="font-normal normal-case text-black ml-2">{owner}</span>
      </p>
      <p className="font-bold uppercase my-1 text-indigo-800">
        Email:
        <span className="font-normal normal-case text-black ml-2">{email}</span>
      </p>
      <p className="font-bold uppercase my-1 text-indigo-800">
        Date:
        <span className="font-normal normal-case text-black ml-2">
          {formattedDate(date)}
        </span>
      </p>
      <p className="font-bold uppercase my-1 text-indigo-800">
        Symptoms:
        <span className="font-normal normal-case text-black w-[400px] ml-2">
          {symptoms}
        </span>
      </p>
      

      <div className="flex justify-between my-5">
        <button className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
                 onClick={()=>{editPatient(patient)}} >
          Editar
        </button>
        <button className="py-2 px-10 bg-red-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
                onClick={()=>{deletePatient(_id)}}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Patients;
