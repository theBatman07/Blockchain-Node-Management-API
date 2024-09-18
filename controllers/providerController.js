const Machine = require('../models/Machine');

exports.storeMachine = async (req, res) => {
  try {
    const { name, cpu, ram, storage } = req.body;
    const newMachine = new Machine({
      provider: req.user.id,
      name,
      cpu,
      ram,
      storage
    });
    const machine = await newMachine.save();
    res.json(machine);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getMachines = async (req, res) => {
  try {
    const machines = await Machine.find({ provider: req.user.id });
    res.json(machines);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateMachine = async (req, res) => {
  try {
    const { name, cpu, ram, storage } = req.body;
    let machine = await Machine.findById(req.params.id);

    if (!machine) return res.status(404).json({ msg: 'Machine not found' });

    if (machine.provider.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    machine = await Machine.findByIdAndUpdate(
      req.params.id,
      { $set: { name, cpu, ram, storage } },
      { new: true }
    );

    res.json(machine);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteMachine = async (req, res) => {
  try {
    let machine = await Machine.findById(req.params.id);

    if (!machine) return res.status(404).json({ msg: 'Machine not found' });

    if (machine.provider.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Machine.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Machine removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};