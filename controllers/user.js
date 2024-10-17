import User from '../models/users.js'
import bcrypt from 'bcrypt';
import { createToken } from '../services/jwt.js';

// Método  de prueba del controlador user
export const testUser = (req, res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de usuarios"
    });
};

//  Método registro de usuarios
export const register = async (req, res) => {
    try {
        // Obtener datos de la petición
        let params = req.body;
        
        // Validar los datos obtenidos
        if(!params.name || !params.last_name || !params.nick || !params.email || !params.password) {
            return res.status(400).json({
                status: "error",
                message: "Faltan datos por enviar"
            })
        };

        // Crear el objeto del usuario con los datos que validamos
        let user_to_save = new User(params);

        // Control de usuarios duplicados
        const existingUser = await User.findOne({
            $or: [
                {email: user_to_save.email.toLowerCase() },
                {nick: user_to_save.nick.toLowerCase() }
            ]
        });

        // Validar usuario
        if (existingUser) {
            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe"
            });
        }

        // Cifrar la contraseña
        const salt = await bcrypt.genSalt(10);

        // Guardar usuario en base de datos
        await user_to_save.save(params);

        // Devolver el usuario registrado
        return res.status(200).json({
            message: "Registro de usuario exitoso",
            params,
            user_to_save
        });
        
    } catch (error) {
        console.log("Error en el registro de usuarios: ", error)
        return res.status(500).send({
            status: "error",
            message: "Error en el registro de usuario"
        });
    }
};


// Método de login (usar JWT)
export const login = async (req, res) => {
    try {
        
        //  Párametros del body (eviados en la petición)
        let params = req.body;

        // Validar que si recibimos el email y el password
        if(!params.email || !params.password) {
            return res.status(400).send({
                status: "error",
                message: "Faltan datos para enviar"
            });
        }

        const userBD = await User.findOne({ email: params.email.toLowerCase() });

        // Si no existe el usuario buscado
        if(!userBD) {
            return res.status(404).send({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        // Comprobar su contraseña
        const validPassword = await bcrypt.compare(params.password, userBD.password);

        // Valida si el passsword es incorrecta (false)
        if(!validPassword) {
            return res.status(401).send({
                status: "error",
                message: "Contraseña incorrecta"
            })
        }

        // Generar toekn de autenticación (JWT)
        const token = createToken(userBD);

        // Devolver respuesta de login exitoso
        return res.status(200).json({
            status: "success",
            message: "Autenticación exitosa",
            token,
            userBD: {
                id: userBD._id,
                name: userBD.name,
                last_name: userBD.last_name,
                email: userBD.email,
                nick: userBD.nick,
                image: userBD.image
            }
        });


    } catch (error) {
        console.log("Error en la autenticación del usuario: ", error);
        // Retornar error
        return res.status(500).send({
            status: "error",
            message: "Error en la autenticación del usuario"
        })
    }
}