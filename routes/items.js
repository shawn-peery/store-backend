const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).send(items);
  } catch {
    res.status(400).send(err);
  }
});

router.get("/:id", async (req, res) => {
  const itemId = request.params.id;

  try {
    const item = await Item.findById(itemId);
    res.status(200).send(item);
  } catch {
    res.status(400).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const savedItem = await Item.create(req.body);
    res.status(201).send(savedItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", async (req, res) => {
  const itemId = request.params.id;

  try {
    const updatedItem = await Item.replaceOne({ _id: req.params.id }, req.body);
    res.status(200).send(updatedItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedItem = await Item.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).send(updatedItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.remove({ _id: req.params.id });
    res.status(200).send(deletedItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
