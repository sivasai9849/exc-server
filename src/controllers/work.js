const ExcavatorWork = require('../models/ExcavatorWork');

exports.getAllExcavatorWorks = async (req, res) => {
    try {
        const userId = req.userId;
        const works = await ExcavatorWork.findAll({ where: { user_id: userId } });
        res.json(works);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createExcavatorWork = async (req, res) => {
    try {
        const work = await ExcavatorWork.create({ ...req.body, user_id: req.userId });
        res.status(201).json(work);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getExcavatorWorkById = async (req, res) => {
    try {
        const work = await ExcavatorWork.findOne({ where: { id: req.params.id, user_id: req.userId } });
        if (!work) return res.status(404).json({ message: 'Work not found' });
        res.json(work);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateExcavatorWork = async (req, res) => {
    try {
        const work = await ExcavatorWork.findOne({ where: { id: req.params.id, user_id: req.userId } });
        if (!work) return res.status(404).json({ message: 'Work not found' });
        await work.update(req.body);
        res.json(work);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.deleteExcavatorWork = async (req, res) => {
    try {
        const work = await ExcavatorWork.findOne({ where: { id: req.params.id, user_id: req.userId } });
        if (!work) return res.status(404).json({ message: 'Work not found' });
        await work.destroy();
        res.json({ message: 'Work deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}