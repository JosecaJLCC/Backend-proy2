import { pool } from '../connection.js'
//Para el envio de email
//import nodemailer from 'nodemailer'
//import {google} from 'googleapis'
//

//Para los jsonwebtoken
import jwt from 'jsonwebtoken'
//

export const getUsuario = async (req, res) => {
    
    try{
        const result = await pool.query('select idUsuario, usuario, correo, foto, rol, ciPersona from usuario;');
                                         
        res.json(result[0]);
        
    }
    catch(e){
        return res.status(500).json({
            message:"Ocurrio un error en getUsuario"
        })
    }
}

export const createUsuario = async(req, res)=>{
   try {
        const {usuario, correo, contrasenia, ciPersona}=req.body;
        const {zona, via, nroPuerta, ciPropietario} = req.body;
        const file=req.file
        const foto=`http://localhost:3000/imagenes/${file.filename}`;
        const rol="USUARIO"
        
        /*Para el envio de email
        
        const contentHTML = `<h1>Formulario de Registro con Nodemailer</h1>
                            <ul> usuario: ${usuario} </ul>
                            <ul> correo: ${correo} </ul>
                            <ul> usuario: ${ciPersona} </ul>
                            <p>¡Tu registro fue exitoso!</p>` 
                         
        const CLIENT_ID="691193112547-97tvi1uvrq5lrnmtq6d3b9p8a4ss9rf2.apps.googleusercontent.com";
        const CLIENT_SECRET="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";
        const REDIRECT_URI="https://developers.google.com/oauthplayground";
        const REFRESH_TOKEN="1//04F7vM6wZuL1ACgYIARAAGAQSNwF-L9Ir16p_FPLjFK7Oc9Ipz3Jj0HfdwRJ0xzcig1_ANZqniKsqpQ6VJHi2lR5DamwxJdU2-Wg";
        
        const oAuth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        );

        oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});
        async function  sendmail(){         
            const accessToken= await oAuth2Client.getAccessToken()
            const transporter = nodemailer.createTransport({
                service:"gmail",
                auth:{
                    type:"OAuth2",
                    user:"informaticajlcc@gmail.com",
                    clientId:CLIENT_ID,
                    clientSecret:CLIENT_SECRET,
                    refreshToken:REFRESH_TOKEN,
                    accessToken:accessToken
                }

            }); 
            const mailOptions = {
                from: "Pagina web Nodemailer <informaticajlcc@gmail.com>",
                to:`${correo}`,
                subject:"Prueba de envio de emails con Nodemailer",
                html:contentHTML
            };
            transporter.sendMail(mailOptions)  
        }
        sendmail();*/
        
        //.then(res => res.status(200).send("enviado"))
        //.catch(error => console.log(error.message));
        //
        const response1 = await pool.query('insert into usuario(usuario, correo, contrasenia, foto, rol, ciPersona) values(?, ?, ?, ?, ?, ?);', [usuario, correo, contrasenia, foto, rol, ciPersona])
        //console.log("Usuario2 creado",response1[0]);
        const response2 = await pool.query('insert into domicilio(zona, via, nroPuerta, ciPropietario) values(?, ?, ?, ?);', [zona, via, nroPuerta, ciPropietario])
        //console.log("domicilio2 creado",response2[0]);
        //const response3 = await pool.query('insert into contacto(nombre, apellido, telf, correoContacto, idUsuarioC) values(?, ?, ?, ?, ?);', [nombre, apellido, telf, correoContacto, idUsuarioC])
        //console.log("contacto2 creado",response3[0]);
        const idd = response1[0].insertId;
        res.status(201).json({
            idd
        });
   } catch (error) {
    return res.status(500).json({
        message:"Ocurrio un error en createUsuario",
        error: error.message // Agregar el mensaje de error real
    })
   }
}

//login
export const login = async(req, res) => {
    try {
        const {correo, contrasenia}=req.body;
        const response =await pool.query('select correo, contrasenia from usuario where correo=? and contrasenia=?;', [correo, contrasenia])
        
        console.log("PostLogin",response[0].length);
        console.log("responde: ", response)
        
        if(response[0].length==0) {        
            return res.status(204).json({
                message:"Usuario no encontrado"
            })
        }
        //Para los jsonwebtoken
        const token = jwt.sign({ correo:correo, contrasenia:contrasenia}, 'my_secret_key');
        res.json({
            token
        })
        //
        /*
        res.send({
            correo
        })*/
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error en getUsuariosByIdUsuario",
            error: error.message // Agregar el mensaje de error real

        })
    }
    
}

export const ensureToken = (req, res, next)=>{
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.status(403).json({
            message:"Undefined"
        })
    }
        
}

//funciona para encontrar un ciPersona
export const getUsuariosByIdUsuario = async(req, res) => {
    try {
        console.log(req.params.ciPersona)
        const ciPersona=req.params.ciPersona;
        const response =await pool.query('select idUsuario, usuario, correo, foto, rol, ciPersona from usuario where ciPersona=?;', [ciPersona])
        
        console.log(response)
        if(response[0].length===0) {
            return res.status(204).json({
                message:"Usuario no encontrado"
            })
        }
        
        res.status(200).json(response[0]);
        
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error en getUsuariosByIdUsuario",
            error: error.message // Agregar el mensaje de error real
        })
    }
    
}

export const deleteUsuario = async(req, res) => {
    try {
        const idUsuario=req.params.idUsuario;
        const response = await pool.query('delete from usuario where idUsuario=?',[idUsuario])
        //console.log(response);
        if(response[0].affectedRows===0) return res.status(404).json({
            message:"Usuario no encontrada"
        })
        res.send(`El Usuario ${idUsuario} a sido eliminado`);
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error en deleteUsuario"
        })
    }
}

export const updateUsuario = async(req, res) => {
    try {
        const idUsuario=req.params.idUsuario;
        const {usuario, correo, contrasenia, foto, rol, ci}=req.body;
        const response = await pool.query('update Usuario set usuario=IFNULL(?, usuario), correo=IFNULL(?, correo), contrasenia=IFNULL(?,contrasenia), foto=IFNULL(?, foto), rol=IFNULL(?, rol), ci=IFNULL(?, ci) where idUsuario=?',[
            usuario,
            correo, 
            contrasenia, 
            foto, 
            rol,
            idUsuario
        ])
        console.log(response);
        if(response[0].affectedRows===0) return res.status(404).json({
            message:"Usuario no encontrada"
        })
        res.json(`Los datos de la Usuario con ${idUsuario} ha sido actualizado`);
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error en updateUsuario"
        })
    }
}

