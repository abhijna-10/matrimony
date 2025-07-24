const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/partnerpref', require('./routes/partnerPref'));
app.use('/api/matchreq', require('./routes/matchReq'));
app.use('/api/message', require('./routes/message'));

app.listen(5000, () => console.log("Server running on port 5000"));
