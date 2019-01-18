const express = require("express");
const db = require("../helpers/actionModel");

const router = express.Router();

//middleware

//endpoints

router.post("/", (req, res) => {
  db("actions")
    .insert(req.body)
    .then(ids => {
      db("actions")
        .where({ id: ids[0] })
        .then(newAction => {
          res.status(201).send({ newAction });
        });
    })
    .catch(() => res.status(500).send({ error: "Data couldn't be saved." }));
});

module.exports = router;
