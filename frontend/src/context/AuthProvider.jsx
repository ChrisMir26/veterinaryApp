// Importando hooks y funciones necesarias de React.
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// Creando un contexto para la autenticación.
const AuthContext = createContext(); // <-- Crea un Contexto sin valor predeterminado.
// Definiendo un componente proveedor de contexto para la autenticación.
const AuthProvider = ({ children }) => {
  // <-- `children` son los componentes hijos que estarán envueltos por este Provider.
  const navigate = useNavigate()
  // Inicializando el estado del proveedor con un objeto vacío.
  const [user, setUser] = useState(null); // <-- Estado local para guardar los datos del proveedor.
  const [loading, setLoading] = useState(true); // <-- Estado local para guardar los datos del proveedor.

  useEffect(() => {
    const VerifyUser = async () => {
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
        const { data } = await axios.get(
          "http://localhost:4000/api/veterinarios/profile",
          config
        );
        setUser({ data });
        setLoading(false);

      } catch (error) {
        setUser({});
      }
    };

    VerifyUser();
  }, []);

  const logOut = async () => {
    localStorage.removeItem("token");
    setUser({});
    return navigate("/")
  };

  // Retornando el Proveedor de contexto de autenticación envolviendo a los componentes hijos.
  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Exportando el Proveedor de Autenticación y el Contexto de Autenticación.
export { AuthProvider }; // <-- Exportación nombrada del componente AuthProvider.
export default AuthContext; // <-- Exportación por defecto del contexto AuthContext.
