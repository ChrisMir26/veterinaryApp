import React, { useState,useEffect } from "react";
import Alert from "./Alert";
import usePatients from "../hooks/usePatients";

const FormAdmin = () => {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // los meses empiezan desde 0
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });
  const [id, setId] = useState(null);


  const { singlePatient, savePatient } = usePatients();

  useEffect(() => {
    if (singlePatient?.name) {

      const formattedDate = new Date(singlePatient.date).toISOString().split('T')[0];

      setName(singlePatient.name);
      setOwner(singlePatient.owner);
      setEmail(singlePatient.email);      
      setDate(formattedDate);
      setSymptoms(singlePatient.symptoms);
      setId(singlePatient._id);
    }
  }, [singlePatient]);
  




  const [alert, setAlert] = useState({ msg: "", error: false });
  const regex = /^[a-zA-Z]{1,15}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, owner, email, date, symptoms].includes("")) {
      return setAlert({
        msg: `Please fill out all the required fields.`,
        error: true,
      });
    }

    if (!regex.test(name) || !regex.test(owner)) {
      return setAlert({
        msg: `Name and Owner maximum of 15 characters, no numbers, and no special symbols`,
        error: true,
      });
    }
    if (symptoms.length < 10 || symptoms.length > 100) {
      return setAlert({
        msg: `Symptoms description min 10 characters, max 100`,
        error: true,
      });
    }

    savePatient({ name, owner, email, date, symptoms,id });
    setName("");
    setOwner("");
    setEmail("");
    setDate("");
    setSymptoms("");
    setId("");
    setAlert({ msg: id ? "Patient updated." : "Patient added.", error: false });
    setTimeout(() => {
      setAlert({ msg: ``, error: false });
    }, 3000);
  };

  const { msg } = alert;
  return (
    <>
                <h2 className='font-black text-3xl text-center'>Patient Administrato</h2>

      <p className="tet-xl mt-5 mb-10 text-center">
        Add your patients and{" "}
        <span className="text-indigo-600 font-bold"> manage them</span>
      </p>

      <form
        className="bg-white py-10 m-2 md:m-0 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        {msg && <Alert alert={alert} />}
        <div className="mb-5">
          <label htmlFor="pet" className="text-grat-700 uppercase font-bold  ">
            Pet name
          </label>
          <input
            type="text"
            id="pet"
            placeholder="Pet Name"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400
                rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="owner"
            className="text-grat-700 uppercase font-bold  "
          >
            Owner
          </label>
          <input
            type="text"
            id="owner"
            placeholder="Owners name"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400
                rounded-md"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="text-grat-700 uppercase font-bold  "
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400
                rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="date" className="text-grat-700 uppercase font-bold  ">
            Discharge date
          </label>
          <input
            type="date"
            id="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400
                rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="symptoms"
            className="text-grat-700 uppercase font-bold  "
          >
            symptoms
          </label>
          <textarea
            id="symptoms"
            placeholder="Describe symptoms"
            className="border-2 w-full sm:h-10 h-40 p-2 mt-2 placeholder-gray-400 resize-none
                rounded-md"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value={id ? "Save changes" : "Add patient"}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors"
        />
      </form>
    </>
  );
};

export default FormAdmin;
