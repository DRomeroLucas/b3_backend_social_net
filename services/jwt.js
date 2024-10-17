import kwt from 'jwt-simple';
import moment from 'moment';

// Clave secreta
const secret = 'SECRET_KEY_pRoJeCt_sOcIOal_net.@';

// Método para generar tokens
// Unix: Cuenta los segundos transcurridos desde el 1 de enero de 1970 hasta este momento
const createToken = (user) => {
    const payload = {
        userId: user.id,
        role: user.role,
        iat: moment().unix(), // Fecha de emisión
        exp: moment().add(7, 'days').unix() // Fecha de expiración
    }

    // Devolver el kwt token codificado
    return jwt.encode(payload, secret);
};

export {
    secret,
    createToken
};