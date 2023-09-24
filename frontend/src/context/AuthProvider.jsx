// Importando hooks y funciones necesarias de React.
import { useState, createContext,useEffect } from "react";
import axios from "axios"

// Creando un contexto para la autenticación.
const AuthContext = createContext(); // <-- Crea un Contexto sin valor predeterminado.

// Definiendo un componente proveedor de contexto para la autenticación.
const AuthProvider = ({ children }) => { // <-- `children` son los componentes hijos que estarán envueltos por este Provider.



    // Inicializando el estado del proveedor con un objeto vacío.
    const [user, setUser] = useState(null); // <-- Estado local para guardar los datos del proveedor.


    useEffect(()=>{
        const VerifyUser = async() =>{
            const token = localStorage.getItem("token")

            if(!token) return token

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`

                }
            }
            try {
                const {data} = await axios.get("http://localhost:4000/api/veterinarios/profile",config)
                setUser({data})
                console.log(user)
            } catch (error) {
                setUser({})
                console.log(error )
            }

        }

        VerifyUser()
    },[])

    // Retornando el Proveedor de contexto de autenticación envolviendo a los componentes hijos.
    return (
        <AuthContext.Provider value={{ user, setUser }}> 
            {children} 
        </AuthContext.Provider>
    );
}

// Exportando el Proveedor de Autenticación y el Contexto de Autenticación.
export { AuthProvider }; // <-- Exportación nombrada del componente AuthProvider.
export default AuthContext; // <-- Exportación por defecto del contexto AuthContext.
