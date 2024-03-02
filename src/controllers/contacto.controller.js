import { pool } from '../connection.js'


export const getContacto = async (req, res) => {
    
    try{
        const result = await pool.query('select nombre, apellido, telf, correoContacto from contacto;');                                        
        res.json(result[0]);
    }
    catch(e){
        return res.status(500).json({
            message:"Ocurrio un error en getContacto"
        })
    }
}

export const createContacto = async(req, res)=>{
   try {
        const {nombre, apellido, telf, correoContacto, idUsuarioC}=req.body;
        console.log("llega",idUsuarioC);
        const response = await pool.query('insert into contacto(nombre, apellido, telf, correoContacto, idUsuarioC) values(?, ?, ?, ?, ?);', [nombre, apellido, telf, correoContacto, idUsuarioC])
        console.log("contacto creado",response[0]);
        res.status(201).json({
            response
        });
   } catch (error) {
    return res.status(500).json({
        message:"Ocurrio un error en createContacto",
        error: error.message // Agregar el mensaje de error real
    })
   }
}

//funciona para encontrar un ciPersona
export const getContactosByIdContacto = async(req, res) => {
    try {
        //console.log(req.params.ciPersona)
        const idUsuarioC=req.params.idUsuarioC;
        const response =await pool.query('select * from contacto where idUsuarioC=?;', [idUsuarioC])
        
        console.log(response)
        if(response[0].length===0) {
            return res.status(204).json({
                message:"Contacto no encontrado"
            })
        }
        
        res.status(200).json(response[0]);
        
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error en getContactosByIdContacto",
            error: error.message // Agregar el mensaje de error real
        })
    }
    
}





