const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const { storeMachine, getMachines, updateMachine, deleteMachine } = require('../controllers/providerController');

router.post('/machines', [auth, roleAuth(['provider'])], storeMachine);
router.get('/machines', [auth, roleAuth(['provider'])], getMachines);
router.put('/machines/:id', [auth, roleAuth(['provider'])], updateMachine);
router.delete('/machines/:id', [auth, roleAuth(['provider'])], deleteMachine);

module.exports = router;