const express = require("express");
const db = require("../helpers/projectModel");

const router = express.Router();

// middleware

function checkIdExists(req, res, next) {
    const id = req.params.id
  db
    .get(id)
    .then(id => {
      if (id) {
        next();
      } else {
        res.status(404).send({ error: "The ID doesn't exist." });
      }
    });
}

//endpoints

router.post("/", (req, res) => {
  db.insert(req.body)
    .then(result => {
      db.get(result.id).then(newProject => {
        res.status(201).send({ newProject });
      });
    })
    .catch(() => res.status(500).send({ error: "Data could not be saved." }));
});

router.get("/:id", checkIdExists, (req, res) => {
  const id = req.params.id;
  db.get(id)
    .then(project => {
      res.status(200).send({ project });
    })
    .catch(() => {
      res.status(500).send({ error: "The data could not be retrieved." });
    });
});

module.exports = router;
