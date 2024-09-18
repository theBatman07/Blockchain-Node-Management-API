const Node = require('../models/Node');
const Machine = require('../models/Machine');
const DeployedNode = require('../models/DeployedNode');

// Simple matching algorithm
const findBestMachine = async (nodeRequirements) => {
  const machines = await Machine.find({});
  let bestMachine = null;
  let bestScore = -1;

  for (const machine of machines) {
    const cpuScore = parseInt(machine.cpu) >= parseInt(nodeRequirements.requiredCpu) ? 1 : 0;
    const ramScore = parseInt(machine.ram) >= parseInt(nodeRequirements.requiredRam) ? 1 : 0;
    const storageScore = parseInt(machine.storage) >= parseInt(nodeRequirements.requiredStorage) ? 1 : 0;

    const totalScore = cpuScore + ramScore + storageScore;

    if (totalScore > bestScore) {
      bestScore = totalScore;
      bestMachine = machine;
    }
  }

  return bestMachine;
};

exports.deployNode = async (req, res) => {
  try {
    const { nodeId } = req.body;
    const node = await Node.findById(nodeId);

    if (!node) {
      return res.status(404).json({ msg: 'Node not found' });
    }

    const bestMachine = await findBestMachine(node);

    if (!bestMachine) {
      return res.status(400).json({ msg: 'No suitable machine found for deployment' });
    }

    const deployedNode = new DeployedNode({
      consumer: req.user.id,
      node: node._id,
      machine: bestMachine._id
    });

    await deployedNode.save();

    res.json(deployedNode);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getDeployedNodes = async (req, res) => {
  try {
    const deployedNodes = await DeployedNode.find({ consumer: req.user.id })
      .populate('node', 'name type')
      .populate('machine', 'name cpu ram storage');

    res.json(deployedNodes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteDeployedNode = async (req, res) => {
  try {
    const deployedNode = await DeployedNode.findById(req.params.id);

    if (!deployedNode) {
      return res.status(404).json({ msg: 'Deployed node not found' });
    }

    if (deployedNode.consumer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await DeployedNode.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Deployed node removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
