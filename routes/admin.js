const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const { storeNode, getNodes, updateNode, deleteNode } = require('../controllers/adminController');

router.post('/nodes', [auth, roleAuth(['admin'])], storeNode);
router.get('/nodes', [auth, roleAuth(['admin'])], getNodes);
router.put('/nodes/:id', [auth, roleAuth(['admin'])], updateNode);
router.delete('/nodes/:id', [auth, roleAuth(['admin'])], deleteNode);

module.exports = router;