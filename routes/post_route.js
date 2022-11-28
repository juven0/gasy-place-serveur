const router = require('express').Router();
const post = require('../controler/postControler');
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/upload/post');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});
const postImage = multer({ storage })

router.post('/',postImage.single('image'), post.create)
router.get('/', post.view);
router.put('/:id', post.update);
router.delete('/:id', post.delete);
router.patch('/like-post/:id', post.liksPost);
router.patch('/unlike-post/:id', post.unLiksPost);

router.patch('/comment/:id', post.comment);
router.patch('/delete-comment/:id', post.deleteComment);

//router.post('/upload', upload.single('file'), uploadContoler.uploadPicture);


module.exports = router;