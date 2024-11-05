import jwt from "jwt-simple";
import moment from "moment";
import { secret } from "../services/jwt.js"; // Importar clave secreta

// Método de autenticación
 export const ensureAuth = (req, res, next) => {
    
    // Comprobar si llega la cabecera
    if(!req.headers.authorization) {
        return res.status(403).send({
            status: "error",
            message: "La petición no tiene la cabecera de autenticación"
        });
    };
    // Limpiar el token, quitar comillas si las hay
    const token = req.headers.authorization.replace(/['"]/g, '').replace("Bearer ", "");

    // Verificar  el token
    try {
        let payload = jwt.decode(token, secret)

        //  Verificar si está vigente aún
        if(payload.exp <= moment.unix()){
            return res.status(401).send({
                status: "error",
                message: "El token ha expirado"
            });
        }

        // Agregar datos del usuario a la request
        req.user = payload;
        
    } catch (error) {
        return res.status(404).send({
            status: "error",
            message: "El token no es válido."
        });
    
    }
    //  Ejecutar el sifuiente método
    next();
};