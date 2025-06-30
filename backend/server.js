require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');

const Visitor = require('./models/Visitor');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Visitor server DB connected"))
  .catch((err) => console.error(err));

// Create a visitor pass
app.post('/api/visitors/create-pass', async (req, res) => {
  const { name, email, phone, visitType } = req.body;
  const token = Math.random().toString(36).substr(2, 9);
  const visitor = new Visitor({
    name,
    email,
    phone,
    visitType,
    token,
    inductionCompleted: visitType === 'Plant' ? false : null,
    timeIn: new Date()   
  });

  await visitor.save();


  if (visitType === 'Plant') {
    try {
      await axios.post('http://localhost:7000/api/induction/notify', {
        name,
        token,
        visitType
      });
      console.log("Security Induction Server notified.");
    } catch (err) {
      console.error("Could not notify induction server", err.message);
    }
  }

  res.json(visitor);
});


app.get('/api/visitors/passes', async (req, res) => {
  const visitors = await Visitor.find({ timeOut: null });
  res.json(visitors);
});


app.get('/api/visitors/search/:token', async (req, res) => {
  const visitor = await Visitor.findOne({ token: req.params.token });
  if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
  res.json(visitor);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Visitor server running on port ${PORT}`));

// Mark visitor as left (timeOut)
app.patch('/api/visitors/mark-out/:token', async (req, res) => {
  const visitor = await Visitor.findOneAndUpdate(
    { token: req.params.token, timeOut: null },
    { timeOut: new Date() },
    { new: true }
  );

  if (!visitor) return res.status(404).json({ message: 'Visitor not found or already marked out.' });
  res.json(visitor);
});