const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


//dependencies
const config = require("./server/config/config");
const router = require("./server/routes/router");

const app = express();

//Mindle Ware
app.use(bodyParser.json());
app.use(cors());

app.use('/game',router);

const port = process.env.PORT || config.port;

app.listen(port, () => console.log(`Start server on port ${port}`))

