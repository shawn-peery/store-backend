const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const NODE_PATH = process.env.PWD;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    // const string = items[0].ItemPhoto.data.toString("base64");

    const finalArray = items.map((item) => {
      const itemObject = item.toObject();
      const itemPhotoString = (itemObject.ItemPhoto = convertItemPhotoToBase64(
        item
      ));

      itemObject.ItemPhoto = itemPhotoString;
      return itemObject;
    });

    res.status(200).send(finalArray);
  } catch (err) {
    res.status(400).send(err);
    console.error(err);
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

router.post("/", upload.single("ItemPhoto"), async (req, res) => {
  try {
    const filePath = path.join(NODE_PATH + "/uploads/" + req.file.filename);

    const savedItem = {
      Name: req.body.Name,
      Quantity: req.body.Quantity,
      MarketPrice: req.body.MarketPrice,
      SellerValue: req.body.SellerValue,
      AllianceValue: req.body.AllianceValue,
      ItemPhoto: {
        data: fs.readFileSync(filePath),
        contentType: "image/png",
      },
    };
    Item.create(savedItem, (err, item) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.status(201).send(item);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.put("/:id", async (req, res) => {
  const itemId = request.params.id;

  const replacedItem = await {
    Name: req.body.name,
    Quantity: req.body.Quantity,
    MarketPrice: req.body.marketprice,
    SellerValue: req.body.sellervalue,
    AllianceValue: req.body.alliancevalue,
    ItemPhoto: {
      data: fs.readFileSync(
        path.join(NODE_PATH + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };

  try {
    const updatedItem = await Item.replaceOne(
      { _id: req.params.id },
      replacedItem
    );
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

function convertItemPhotoToBase64(item) {
  return item.ItemPhoto.data.toString("base64");
}
