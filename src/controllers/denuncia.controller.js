import { pool } from '../connection.js'


export const getDenuncia = async (req, res) => {
    
    try{
        const result = await pool.query('select nombre, apellido, telf, correoDenuncia from denuncia;');                                        
        res.json(result[0]);
    }
    catch(e){
        return res.status(500).json({
            message:"Ocurrio un error en getDenuncia"
        })
    }
}

export const createDenuncia = async(req, res)=>{
   try {
        const {nombre, apellido, telf, correoDenuncia, idUsuarioC}=req.body;
        console.log("llega",idUsuarioC);
        const response = await pool.query('insert into Denuncia(nombre, apellido, telf, correoDenuncia, idUsuarioC) values(?, ?, ?, ?, ?);', [nombre, apellido, telf, correoDenuncia, idUsuarioC])
        console.log("Denuncia creado",response[0]);
        res.status(201).json({
            response
        });
   } catch (error) {
    return res.status(500).json({
        message:"Ocurrio un error en createDenuncia",
        error: error.message // Agregar el mensaje de error real
    })
   }
}

//funciona para encontrar un ciPersona
export const getDenunciasByIdDenuncia = async(req, res) => {
    try {
        //console.log(req.params.ciPersona)
        const idUsuarioC=req.params.idUsuarioC;
        const response =await pool.query('select * from Denuncia where idUsuarioC=?;', [idUsuarioC])
        
        console.log(response)
        if(response[0].length===0) {
            return res.status(204).json({
                message:"Denuncia no encontrado"
            })
        }
        
        res.status(200).json(response[0]);
        
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error en getDenunciasByIdDenuncia",
            error: error.message // Agregar el mensaje de error real
        })
    }
    
}





