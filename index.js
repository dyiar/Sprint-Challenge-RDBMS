const express = require('express');

const server = express();
server.use(express.json());

const port = 3000;

server.listen(port, function() {
    console.log(`server running on port ${port}`)
})