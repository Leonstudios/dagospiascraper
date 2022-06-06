const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/data.txt');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = {
    app
}