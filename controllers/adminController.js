const Node = require('../models/Node');

exports.storeNode = async (req, res) => {
  try {
    const { name, type, requiredCpu, requiredRam, requiredStorage } = req.body;
    const newNode = new Node({
      name,
      type,
      requiredCpu,
      requiredRam,
      requiredStorage
    });
    const node = await newNode.save();
    res.json(node);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getNodes = async (req, res) => {
  try {
    const nodes = await Node.find();
    res.json(nodes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateNode = async (req, res) => {
  try {
    const { name, type, requiredCpu, requiredRam, requiredStorage } = req.body;
    let node = await Node.findById(req.params.id);

    if (!node) return res.status(404).json({ msg: 'Node not found' });

    node = await Node.findByIdAndUpdate(
      req.params.id,
      { $set: { name, type, requiredCpu, requiredRam, requiredStorage } },
      { new: true }
    );

    res.json(node);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteNode = async (req, res) => {
  try {
    let node = await Node.findById(req.params.id);

    if (!node) return res.status(404).json({ msg: 'Node not found' });

    await Node.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Node removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};