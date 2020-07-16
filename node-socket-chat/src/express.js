const express = require("express");
const path = require('path');
const port = 3000;

const app = express();
const staticPath = path.join(__dirname, '../client');

app.use(express.static(staticPath));

app.listen(port, () => {
    console.log('listening on:', port)
});