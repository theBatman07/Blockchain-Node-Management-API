const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const { storeNode, getNodes, updateNode, deleteNode } = require('../controllers/adminController');
const { storeMachine, getMachines, updateMachine, deleteMachine } = require('../controllers/providerController');

router.post('/nodes', [auth, roleAuth(['admin'])], storeNode);
router.get('/nodes', [auth, roleAuth(['admin'])], getNodes);
router.put('/nodes/:id', [auth, roleAuth(['admin'])], updateNode);
router.delete('/nodes/:id', [auth, roleAuth(['admin'])], deleteNode);

router.post('/machines', [auth, roleAuth(['admin'])], storeMachine);
router.get('/machines', [auth, roleAuth(['admin'])], getMachines);
router.put('/machines/:id', [auth, roleAuth(['admin'])], updateMachine);
router.delete('/machines/:id', [auth, roleAuth(['admin'])], deleteMachine);

module.exports = router;