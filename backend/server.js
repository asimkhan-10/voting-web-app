const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const connectDB = require('./db');

connectDB();

// Enable CORS for frontend requests
app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});