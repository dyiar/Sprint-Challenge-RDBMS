const express = require("express");
const db = require("../helpers/actionModel");

const router = express.Router();

//middleware

function checkIdExists(req, res, next) {
  const id = req.params.id;

  db.get(id).then(id => {
    if (id) {
      next();
    } else {
      res.status(404).end({ error: "The ID doesn't exist." });
    }
  });
}

//endpoints

router.post("/", (req, res) => {
  db.insert(req.body)
    .then(result => {
      db.get(result.id).then(newAction => {
        res.status(201).send({ newAction });
      });
    })
    .catch(() => res.status(500).send({ error: "Data couldn't be saved." }));
});

router.get("/", (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).send({ actions });
    })
    .catch(() =>
      res.status(500).send({ error: "The data could not be retrieved." })
    );
});

router.get("/:id", checkIdExists, (req, res) => {
  const id = req.params.id;
  db.get(id)
    .then(action => {
      res.status(200).send({ action });
    })
    .catch(() =>
      res.status(500).send({ error: "The actions could not be retrieved." })
    );
});

router.put("/:id", checkIdExists, (req, res) => {
  const id = req.params.id;
  const change = req.body;

  db.update(id, change)
    .then(result => {
      res.status(200).send({ result });
    })
    .catch(() =>
      res.status(500).send({ error: "The data could not be saved." })
    );
});

router.delete("/:id", checkIdExists, (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(count => {
      res.status(200).send({ deleted: count });
    })
    .catch(() =>
      res.status(500).send({ error: "The data could not be deleted." })
    );
});

module.exports = router;
