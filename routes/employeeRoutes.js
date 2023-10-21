const express = require('express');
const { getEmployee, getAllEmployees } = require('../controllers/employeeController');

const router = express.Router();

router.route('/').get(getAllEmployees);
router.route('/:id').get(getEmployee);

module.exports = router;
