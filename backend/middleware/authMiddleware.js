import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

export const checkAuth = async (req, res, next) => {
    let token; // Variable para almacenar el token JWT


    try {
        // Verifica si la solicitud tiene un encabezado Authorization y comienza con "Bearer"
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Divide el token y extrae la parte del token
            token = req.headers.authorization.split(" ")[1];

            // Decodifica y verifica la autenticidad del token utilizando la clave secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Busca al usuario correspondiente en la base de datos utilizando el ID decodificado
            //crea la sesion
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");
        }

       // return next(); // Llama a la función next() para continuar el flujo de la solicitud

    } catch (error) {
        // Captura y manejo de errores en caso de problemas con el token
        const e = new Error("Token no válido o inexistente");
        res.status(403).json({ msg: e.message }); // Responde c on un estado HTTP 403 y un mensaje de error JSON
    }

    // Este bloque de código nunca se ejecutará debido al return next() anterior

    if (!token) {
        // En caso de que la variable token aún sea indefinida, responde con un mensaje de error similar
        const e = new Error("Token no válido o inexistente");
        res.status(403).json({ msg: e.message });
    }

    next(); // Llama a la función next() (aunque nunca se ejecutará debido al código anterior)
};
