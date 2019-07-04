const express = require('express');
const path = require('path')

const app = express();

const port = process.env.PORT || 3000; 
const publicDirectoryPath = path.join(__dirname, '../public');

// Middleware
app.use(express.static(publicDirectoryPath));

app.listen(port, () => {
    console.log(`Service is up on port ${port}!`);
});