import {createContext,useEffect,useState} from 'react'
import axios from "axios"


const PatientsContext = createContext()

export const PatientsProvider = ({children}) => {
    const [patients,setPatients] = useState([])
    const URL = "http://localhost:4000/api/patients"

    const savePatient = async (patient) =>{

        try {
            const token = localStorage.getItem("token")
            console.log(`soy token de provide`, token)
            const config={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            

            const { data } = await axios.post(URL,patient,config)
            console.log(data)
            console.log(patient)

        } catch (error) {
                console.log(error.response.data?.msg)
        }

    }

  return (
    <PatientsContext.Provider value={{
        patients,
        savePatient

    }}>
        {children}
        
    </PatientsContext.Provider>
  )
}



export default PatientsContext