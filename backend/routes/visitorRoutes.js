const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// visitor pass
router.post('/create-pass', async (req, res) => {
  const { name, email, phone, visitType } = req.body;
  const token = Math.random().toString(36).substr(2, 9);
  const visitor = new Visitor({
    name,
    email,
    phone,
    visitType,
    token,
    inductionCompleted: visitType === 'Plant' ? false : null
  });
  await visitor.save();
  res.json(visitor);
});

// induction 
router.post('/complete-induction/:token', async (req, res) => {
  const visitor = await Visitor.findOne({ token: req.params.token });
  if (!visitor) return res.status(404).send('Visitor not found');
  visitor.inductionCompleted = true;
  await visitor.save();
  res.json(visitor);
});

// all visitors
router.get('/passes', async (req, res) => {
  const visitors = await Visitor.find();
  res.json(visitors);
});

router.post('/checkout/:token', async (req, res) => {
  const visitor = await Visitor.findOne({ token: req.params.token });
  if (!visitor) return res.status(404).send('Visitor not found');
  visitor.timeOut = new Date();
  await visitor.save();
  res.json(visitor);
});

router.get('/search/:token', async (req, res) => {
  const visitor = await Visitor.findOne({ token: req.params.token });
  if (!visitor) return res.status(404).send('Visitor not found');
  res.json(visitor);
});


module.exports = router;
