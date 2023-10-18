const express = require('express');
const { getEmployee } = require('../controllers/employeeController');

const router = express.Router();

// router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getEmployee);

module.exports = router;
