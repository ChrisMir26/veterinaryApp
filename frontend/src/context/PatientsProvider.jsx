import { createContext, useEffect, useState } from "react";
import axios from "axios";

const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [singlePatient, setSinglePatient] = useState({})
  const URL = "http://localhost:4000/api/patients";


  useEffect(() => {
    const gettingPatient = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return

          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };


          const {data} = await axios(URL,config)
          setPatients(data)
      } catch (error) {
        console.log(error);
      }
    };

    gettingPatient()
  }, [patients]);


  const savePatient = async ({ name, owner, email, date, symptoms,id }) => {
    
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };


    if(id){
      
      try {
        const _id = id
        const {data }= await axios.put(`${URL}/${_id}`,{ name, owner, email, date, symptoms,_id },config) 

        const updatedPatients = patients?.map((pacientState)=>{
            if(pacientState._id === data._id ) return data
              else return pacientState

        })   
        setPatients(updatedPatients)
      } catch (error) {
        console.log(error.response.data?.msg)
      }

    }else{
      try {
       
        const { data } = await axios.post(
          URL,
          { name, owner, email, date, symptoms },
          config
        );
        const { createdAt, updateAt, __v, ...savePatient } = data;
        setPatients([savePatient, ...patients]);
      } catch (error) {
        console.log(error.response.data?.msg);
      }  
    }
    


   
  };


  const editPatient = (paciente) =>{
    setSinglePatient(paciente)
  }

  const deletePatient = async (id) =>{
    const userConfirm = confirm("Do you really want to delete this patient?")

    if(userConfirm){
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const {data }= await axios.delete(`${URL}/${id}`,config) 
      console.log(data)
      const updatedPatient = patients.filter((item=>{
        item._id !== id
      }))
        setPatients(updatedPatient)

   
    } catch (error) {
        console.log(error)
    }}
   
  }

  return (
    <PatientsContext.Provider
      value={{
        patients,
        savePatient,
        editPatient,
        singlePatient,
        deletePatient
            }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export default PatientsContext;
