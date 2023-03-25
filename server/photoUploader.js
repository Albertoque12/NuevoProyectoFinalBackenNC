import multer from 'multer'

import * as path from 'path';
import fileDirName from './fileDirName.js';
const { __dirname } = fileDirName(import.meta)
// const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname + '/public/img'))
    },

    filename: function(req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


export default photoUploader = multer({storage})

// const photoUploader = multer({storage})
// module.exports = photoUploader