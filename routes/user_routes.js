const router = require('express').Router();
const authControler = require('../controler/authControler');
const userControler = require('../controler/userControler');
const uploadContoler = require('../controler/upload');
const jwtcontroler = require('../controler/jwtControler')
//const {storage}= require('../utils/mullter')
const multer = require('multer')


router.post('/register', authControler.signUp);
router.post('/login', authControler.singnIn);
router.get('/logout', authControler.logout);
router.get('/jwt', jwtcontroler.verifieToken,(req, res)=>{
    res.status(200).send(res._id)
});

router.get('/:id', userControler.findOne);
router.get('/', userControler.findAll);
router.put('/:id', userControler.updateBio)
router.delete('/delete/:id', userControler.delete);
router.delete('/uninvite/:id', userControler.unInvite);
router.patch('/unfrinde/:id', );
router.patch('/invite/:id', userControler.follow);




const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/upload/profil');
    },
    filename: (req, file, callback) => {
        const name = new Date().getTime();
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '.' + extension);
    }
});

const upload = multer({ storage })

router.post('/upload', upload.single('file'), uploadContoler.upload);




module.exports = router;