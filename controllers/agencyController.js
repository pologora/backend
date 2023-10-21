const { ObjectId } = require('mongodb');
const { client } = require('../config/db');
const catchAsync = require('../utils/catchAsync');

const agenciesCollection = client.db('magazyn').collection('Agencies');

exports.getAllAgencies = catchAsync(async (req, res, next) => {
  const result = await agenciesCollection.find().toArray();

  res.status(200).json({
    status: 'success',
    length: result.length,
    data: result,
  });
});

exports.createAgency = catchAsync(async (req, res, next) => {
  const {
    name, email, phone, contactPerson,
  } = req.body;

  const userData = {
    name,
    email,
    phone,
    contactPerson,
  };

  const user = await agenciesCollection.insertOne(userData);

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.getAgencyById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const agencyObjectId = new ObjectId(id);

  const result = await agenciesCollection.findOne(agencyObjectId);

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

exports.updateAgency = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const agencyObjectId = new ObjectId(id);

  const newData = req.body;

  const query = { _id: agencyObjectId };
  const updateDocument = { $set: newData };
  const options = { returnDocument: 'after' };

  const result = await agenciesCollection.findOneAndUpdate(query, updateDocument, options);

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

exports.deleteAgency = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const agencyObjectId = new ObjectId(id);
  const query = { _id: agencyObjectId };

  const result = await agenciesCollection.findOneAndDelete(query);

  res.status(200).json({
    status: 'success',
    data: result,
  });
});
