const Customer = require('../models/Customer');

exports.getAllCustomers = async (req, res) => {
    try {
        const userId = req.userId;
        const customers = await Customer.findAll({ where: { user_id: userId } });
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCustomer = async (req, res) => {
    try {
        const customer = await Customer.create({ ...req.body, user_id: req.userId });
        res.status(201).json(customer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findOne({ where: { id: req.params.id, user_id: req.userId } });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOne({ where: { id: req.params.id, user_id: req.userId } });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        await customer.update(req.body);
        res.json(customer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOne({ where: { id: req.params.id, user_id: req.userId } });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        await customer.destroy();
        res.json({ message: 'Customer deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};