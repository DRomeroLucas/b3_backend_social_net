// Método  de prueba del controlador follow
export const testFollow = (req, res) => {
    return res.status(200).send({
        message: "Mensaje desde el controlador de follow"
    });
};