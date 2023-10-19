//const jwt = require("jsonwebtoken");
//const secret_key = "Esta es mi llave secreta";
//
//module.exports.authenticate = (req, res, next) => {
//    jwt
//    .verify(req.cookies.usertoken, secret_key, (err,payload) => {
//        if (err) {
//            res.status(401).json({verified:false});
//        } else {
//            next();
//        }
//    });
//} 

const jwt = require("jsonwebtoken");
const secret_key = "Esta es mi llave secreta";

module.exports.authenticate = (req, res, next) => {
    const userToken = req.cookies.usertoken; // Acceder a la cookie llamada "usertoken"

    if (!userToken) {
        return res.status(401).json({ verified: false, message: "No se proporcionó un token." });
    }

    jwt.verify(userToken, secret_key, (err, payload) => {
        if (err) {
            return res.status(401).json({ verified: false, message: "Token no válido." });
        } else {
            next(); // El token es válido, permite que la solicitud continúe.
        }
    });
};