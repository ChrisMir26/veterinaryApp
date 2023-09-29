// Importando hooks y funciones necesarias de React.
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

// Creando un contexto para la autenticación.
const AuthContext = createContext(); // <-- Crea un Contexto sin valor predeterminado.
// Definiendo un componente proveedor de contexto para la autenticación.
const AuthProvider = ({ children }) => {
  // <-- `children` son los componentes hijos que estarán envueltos por este Provider.
  const navigate = useNavigate();
  // Inicializando el estado del proveedor con un objeto vacío.
  const [user, setUser] = useState(null); // <-- Estado local para guardar los datos del proveedor.
  const [loading, setLoading] = useState(true); // <-- Estado local para guardar los datos del proveedor.
  const [alert, setAlert] = useState({ msg: "", error: true });
  const token = localStorage.getItem("token");


  useEffect(() => {
    const VerifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return; // Aquí simplemente retornas ya que no hay token
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/veterinarios/profile",
          config
        );
        if (data) { // Asegurándote de que hay data antes de tratar de establecer el user
          setUser({ data });
          setLoading(false);
        }
      } catch (error) {
        setUser({}); // Aquí puede que quieras manejar el error de una manera diferente
      }
    };

    VerifyUser();
  }, [user]); // Cambiaste la dependencia a token


  const logOut = async (info) => {
    localStorage.removeItem("token");
    return navigate("/");
  };

  const updateUser = async (info) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      console.log(`soitoken`, token);
      return token;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const URL = `${import.meta.env.VITE_REACT_APP_CONNECTION_HOST}/api/veterinarios/profile/${info._id}`;
      const { data } = await axios.put(URL, info, config);
      return data; // Devuelve la respuesta exitosa del servidor
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error("User already in use"); // Lanza una excepción en caso de error 404
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.msg
      ) {
        throw new Error(error.response.data.msg); // Lanza una excepción con el mensaje de error del servidor
      } else {
        throw error; // Lanza cualquier otro error que no sea 404 o no tenga un mensaje específico
      }
    }
  };

  const savePassword = async (datos) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      console.log(`soitoken`, token);
      return token;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const URL = `${import.meta.env.VITE_REACT_APP_CONNECTION_HOST}/api/veterinarios/update-password`;
      console.log("SOY DATOS", datos);
      const { data } = await axios.put(URL, datos, config);
      console.log(`SOY DATAA`, data);

      return {
        msg: data.msg,
      };
    } catch (error) {
      console.log(error);
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  // Retornando el Proveedor de contexto de autenticación envolviendo a los componentes hijos.
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        logOut,
        updateUser,
        savePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Exportando el Proveedor de Autenticación y el Contexto de Autenticación.
export { AuthProvider }; // <-- Exportación nombrada del componente AuthProvider.
export default AuthContext; // <-- Exportación por defecto del contexto AuthContext.
