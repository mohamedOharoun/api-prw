require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/', (req, res) => {
        res.status(200).send('Yay it works')
    }
);

app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}...`);
    }
);