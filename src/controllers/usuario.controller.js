import { pool } from '../connection.js'

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
        const {zona, via, nroPuerta, ci, usuario, correo, contrasenia}=req.body;
        let ciPropietario=ci;
        let ciPersona=ci;
        await pool.query('insert into domicilio (zona, via, nroPuerta, ciPropietario) values(?, ?, ?, ?);', [zona, via, nroPuerta, ciPropietario]);
        await pool.query('insert into usuario (usuario, correo, contrasenia, foto, rol, ciPersona) values(?, ?, ?, ?, ?, ?);', [usuario, correo, contrasenia, "foto", "usuario", ciPersona])
        console.log(response1);
        console.log(response2);
        
   } catch (error) {
    return res.status(500).json({
        message:"Ocurrio un error en createUsuario"
    })
   }
}

//login
export const login = async(req, res) => {
    try {
        const {correo, contrasenia}=req.body;
        const response =await pool.query('select correo, contrasenia from usuario where correo=? and contrasenia=?;', [correo, contrasenia])
        
        console.log("PostLogin",response[0].length)
        if(response[0].length===0) {
            return res.status(404).json({
                message:"Usuario no encontrada"
            })
        }
        res.json(response[0]);
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error en getUsuariosByIdUsuario"
        })
    }
    
}
//
export const getUsuariosByIdUsuario = async(req, res) => {
    try {
        const idUsuario=req.params.idUsuario;
        const response =await pool.query('select * from usuario where idUsuario=?;', [idUsuario])
        
        //console.log(response)
        if(response[0].length===0) return res.status(404).json({
            message:"Usuario no encontrada"
        })
        res.json(response[0]);
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error en getUsuariosByIdUsuario"
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

