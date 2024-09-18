const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const { deployNode, getDeployedNodes, deleteDeployedNode } = require('../controllers/consumerController');

router.post('/deploy', [auth, roleAuth(['consumer'])], deployNode);
router.get('/deployed-nodes', [auth, roleAuth(['consumer'])], getDeployedNodes);
router.delete('/deployed-nodes/:id', [auth, roleAuth(['consumer'])], deleteDeployedNode);

module.exports = router;