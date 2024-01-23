// index.js
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');

const port = process.env.PORT || 3000;

// Middleware
app.use(cors());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



// Routes
app.use('/api', routes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
