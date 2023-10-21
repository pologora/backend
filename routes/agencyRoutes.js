const express = require('express');
const {
  getAllAgencies,
  createAgency,
  getAgencyById,
  updateAgency,
  deleteAgency,
} = require('../controllers/agencyController');

const router = express.Router();

router.route('/').get(getAllAgencies).post(createAgency);
router.route('/:id').get(getAgencyById).patch(updateAgency).delete(deleteAgency);

module.exports = router;
