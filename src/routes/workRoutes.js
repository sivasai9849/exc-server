const express = require('express');
const router = express.Router();
const workController = require('../controllers/work');

router.get('/', workController.getAllExcavatorWorks);
router.post('/', workController.createExcavatorWork);
router.get('/:id', workController.getExcavatorWorkById);
router.put('/:id', workController.updateExcavatorWork);
router.delete('/:id', workController.deleteExcavatorWork);

module.exports = router;
