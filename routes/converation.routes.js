const router = require('express').Router();
const conversation = require('../controler/conversationControler');

router.post('/', conversation.create);
router.get('/:id', conversation.find)


module.exports = router;