const userModel = require('../model/user.model');
const multer = require('multer');

   





// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png'
// };

// module.exports.storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, './public/upload/profil');
//     },
//     filename: (req, file, callback) => {
//         const name = file.originalname.split(' ').join('_');
//         const extension = MIME_TYPES[file.mimetype];
//         callback(null, name + Date.now() + '.' + extension);
//     }
// });

