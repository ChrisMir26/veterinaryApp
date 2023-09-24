// Importando el hook useContext de React.
import { useContext } from 'react'

// Importando el Contexto de Autenticación creado anteriormente.
import AuthContext from '../context/AuthProvider' // <-- Importa el AuthContext del archivo especificado.

// Definiendo un hook personalizado llamado useAuth.
const useAuth = () => {

  
  // Utilizando el hook useContext para acceder al valor actual del contexto de Autenticación.
  return (
    useContext(AuthContext) // <-- Retorna el valor actual del contexto AuthContext (provider y setProvider).
  )
}

// Exportando por defecto el hook personalizado useAuth.
export default useAuth // <-- Exporta el hook personalizado para ser utilizado en otros componentes o archivos.
