import { connect } from "mongoose";
import dotenv from "dotenv";

// Configurar dotenv para usar las variables de entorno
dotenv.config();

const connection = async() => {
    try {
        await connect(process.env.MONGODB_URI);
        console.log("Conectado correctamente a DB_Social_Network");
    } catch (error) {
        console.log("Error al conectar la BD", error);
        throw new Error("No fue posible conectarse a la base de datos :(")
    }
}

export default connection;