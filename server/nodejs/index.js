const express = require('express');
const bodyParser = require('body-parser');

// Constants
const PORT_HTTP = 54321;
const PORT_WS = 12321;
const HOST = '0.0.0.0';

// App
var app = express();
app.use(bodyParser.json());

app.get("/testAPI/1/", (req,res) => {
    var rsp = {
        "val" : "world",
        "arrStr" : [
            "h1", "h2"
        ],
        "arrObj" : [
            {
                "val" : "v1"
            },
            {
                "val" : "v1"
            }
        ]
    };
    res.send(rsp)
});

app.listen(PORT_HTTP, HOST);
console.log(`Running on http://${HOST}:${PORT_HTTP}`);