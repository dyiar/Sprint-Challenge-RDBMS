const express = require("express");
const db = require("../helpers/projectModel");

const router = express.Router();

// middleware

function checkIdExists(req, res, next) {
  const id = req.params.id;
  db.get(id).then(id => {
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

router.get("/", (req, res) => {
  db.get()
    .then(projects => {
      res.status(200).send({ projects });
    })
    .catch(() => {
      res.send(500).send({ error: "The data could not be retrieved." });
    });
});

router.put("/:id", checkIdExists, (req, res) => {
  const id = req.params.id;
  change = req.body;

  db.update(id, change)
    .then(result => res.status(200).send({ result }))
    .catch(() =>
      res.status(500).send({ error: "The data could not be updated." })
    );
});

router.delete('/:id', checkIdExists, (req, res) => {
    const id = req.params.id

    db.remove(id).then(count => {
        res.status(200).send({ count })
    })
    .catch(() => res.status(500).send({ error: "The data could not be deleted." }))
})

module.exports = router;
