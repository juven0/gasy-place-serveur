const router = require('express').Router();
const messageControler = require('../controler/messageControler');

router.post('/send', messageControler.creatMessage);
router.get('/', messageControler.listMessage);
router.delete('/delete', messageControler.deleteMessage);
router.put('/update', messageControler.update)


module.exports = router;