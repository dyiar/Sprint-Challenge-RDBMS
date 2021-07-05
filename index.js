const express = require("express");
const projectsRoutes = require("./projectsRoutes/projectsRoutes");
const actionsRoutes = require("./actionsRoutes/actionsRoutes");

const server = express();
server.use(express.json());

server.use("/projects", projectsRoutes);
server.use("/actions", actionsRoutes);

const port = 3000;

server.listen(port, function() {
  console.log(`server running on port ${port}`);
});
