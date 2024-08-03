const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

router.get('/', async (req, res) => {
    try {
        const userId = req.userId;
        const customers = await Customer.findAll({ where: { user_id: userId } });
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const customer = await Customer.create({ ...req.body, user_id: req.userId });
        res.status(201).json(customer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findOne({ where: { id: req.params.id, user_id: req.userId } });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const customer = await Customer.findOne({ where: { id: req.params.id, user_id: req.userId } });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        await customer.update(req.body);
        res.json(customer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findOne({ where: { id: req.params.id, user_id: req.userId } });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        await customer.destroy();
        res.json({ message: 'Customer deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;