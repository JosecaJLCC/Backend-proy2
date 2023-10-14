import { pool } from '../connection.js'

export const registro = async (req, res) => {
    
    try{
        const result = await pool.query('select * from persona;');
        res.json(result[0]);
       
    }
    catch(e){
        return res.status(500).json({
            message:"Ocurrio un error en getPersona"
        })
    }
}
