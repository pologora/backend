const { ObjectId } = require('mongodb');
const catchAsync = require('../utils/catchAsync');
const { client } = require('../config/db');
const checkResult = require('../utils/checkResult');

const employeeCollection = client.db('magazyn').collection('Employee');

exports.getEmployee = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userObjectId = new ObjectId(id);
  const query = { _id: userObjectId };
  const options = {};

  const result = await employeeCollection.findOne(query, options);

  checkResult(result, 'employee', 'get', 'ID');

  res.status(200).json({
    status: 'success',
    employee: result,
  });
});

exports.getAllEmployees = catchAsync(async (req, res, next) => {
  const result = await employeeCollection.find().toArray();

  res.status(200).json({
    status: 'success',
    length: result.length,
    data: result,
  });
});
