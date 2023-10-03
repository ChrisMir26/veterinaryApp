import { useState, useEffect } from "react";
import FormAdmin from "../components/FormAdmin";
import PatientsList from "../components/PatientsList";

const ManagePatients = () => {
  const [showForm, setShowForm] = useState(true);
  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        onClick={() => setShowForm(!showForm)}
        className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md md:hidden mb-5"
      >
        {showForm ? "Hide form" : "Show form"}
      </button>

         
      <div
        style={{ display: showForm ? "block" : "none" }}
        className="md:block md:w-1/2 lg:w-2/5"
      >
        <FormAdmin />
      </div>
      <div className="md:w-1/2 lg:w-2/5">
        <PatientsList />
      </div>
    </div>
  );
};

export default ManagePatients;
