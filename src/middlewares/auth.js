//import jwt from 'jsonwebtoken';
import config from '../config.js';


export const verifyToken = async (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];
        console.log(bearerHeader, "middlewards");

        console.log(config.SECRET);

        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(" ");
            req.token = bearerToken;
            next();
        }
        else{
            res.status(403, "No tienes autorizacion");
        }/*
        const decoded = jwt.verify(token, config.SECRET);

        let idUsuario=decoded.idUsuario
        
        const connection = await getConnection();
        const result=await connection.query("SELECT * FROM usuario WHERE idUsuario=?", idUsuario);

        if (result.length=0) {
            return res.json({message:"No existe el usuario"});
        }

        next();*/
    } catch (error) {
        return res.status(400).json({message:'No autorizado'});
    }

}