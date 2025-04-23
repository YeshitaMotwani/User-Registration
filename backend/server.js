const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
