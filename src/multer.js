import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        cb(null, path.join(__dirname, '../static/imagenes'))

    },

    filename: function(req, file, cb){
        cb(null, `image${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
    
})

export default storage;