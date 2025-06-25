require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Security Induction server DB connected"))
  .catch((err) => console.error(err));

const Visitor = mongoose.model('Visitor', new mongoose.Schema({
  name: String,
  visitType: String,
  token: String,
  inductionCompleted: Boolean
}));

// Log notifications 
app.post('/api/induction/notify', async (req, res) => {
  const { name, token, visitType } = req.body;
  console.log(`New Plant visitor: ${name} (${token}) for ${visitType}`);
  res.send("Induction server notification received");
});

app.post('/api/induction/complete/:token', async (req, res) => {
  const visitor = await Visitor.findOne({ token: req.params.token });
  if (!visitor) return res.status(404).send("Visitor not found");
  visitor.inductionCompleted = true;
  await visitor.save();
  res.json(visitor);
});

app.get('/api/induction/pending', async (req, res) => {
  const pending = await Visitor.find({ visitType: 'Plant', inductionCompleted: false });
  res.json(pending);
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Security Induction server running on port ${PORT}`));
