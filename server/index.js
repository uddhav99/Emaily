const express = require('express');
const app = express();

const checking = {
    hi: 'there'
}

app.get('/', (req, res) => {
    res.send(checking);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);