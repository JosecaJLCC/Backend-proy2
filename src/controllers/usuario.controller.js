import { pool } from '../connection.js'

export const getUsuario = async (req, res) => {
    
    try{
        const result = await pool.query('select * from usuario;');
        res.json(result);
        console.log(result[0])
    }
    catch(e){
        return res.status(500).json({
            message:"Ocurrio un error en getUsuario"
        })
    }
}


export const createUsuario = async(req, res)=>{
   try {
        const {nick, correo, contrasenia, foto, rol, ci}=req.body;
        const response = await pool.query('insert into usuario(nick, correo, contrasenia, foto, rol, ci) values(?, ?, ?, ?, ?, ?);', [nick, correo, contrasenia, foto, rol, ci]);
        console.log(response);
        res.send({
            idUsuario, nick, correo, contrasenia, foto, rol, ci
        });
   } catch (error) {
    return res.status(500).json({
        message:"Ocurrio un error en createUsuario"
    })
   }
}

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
        const {nick, correo, contrasenia, foto, rol, ci}=req.body;
        const response = await pool.query('update Usuario set nick=IFNULL(?, nick), correo=IFNULL(?, correo), contrasenia=IFNULL(?,contrasenia), foto=IFNULL(?, foto), rol=IFNULL(?, rol), ci=IFNULL(?, ci) where idUsuario=?',[
            nick,
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

