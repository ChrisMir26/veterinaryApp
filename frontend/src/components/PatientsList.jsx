import React from 'react'
import usePatients from '../hooks/usePatients'
import Patients from './Patients'; // Asegúrate de que la ruta sea correcta


const PatientsList = () => {

  const { patients } = usePatients();

  return (
    <>
        {patients?.length ? (
          <>
            <h2 className='font-black text-3xl text-center'>Patients List</h2>
            <p className='tet-xl mt-5 mb-10 text-center'>
              Manage your {" "}<span className='text-indigo-600 font-bold'> patients and apointments</span> 
            </p>
            { patients?.map((patient)=>{
            return  <Patients
              key={patient._id}
              patient={patient}

              />
            })}
          </>
        ) : (
          <>
            <h2 className='font-black text-3xl text-center'>No patients yet</h2>
            <p className='text-xl mt-5 mb-10 text-center'>
            Start by adding patients  {" "}
              <span className='text-indigo-600 font-bold'>and they will appear in this place. </span>

            </p>
          </>
        )}
    </>
  )
}

export default PatientsList