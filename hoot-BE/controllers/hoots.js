// controllers/hoots.js

const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Hoot = require("../models/hoot.js");
const router = express.Router();

// add routes here
router.post("/", verifyToken, async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.create(req.body);
    hoot._doc.author = req.user;
    res.status(201).json(hoot);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const hoots = await Hoot.find({})
      .populate("author")
      .sort({ createdAt: "desc" });
    res.status(200).json(hoots);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/:hootId", verifyToken, async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId).populate([
      "author",
      "comments.author",
    ]);
    res.status(200).json(hoot);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// update a hoot
// PUT /hoots/:hootId
router.put('/:hootId', verifyToken, async (req, res) => {
  // route here
  // get the id of the hoot we want to update 
  // update the hoot with new data from the req.body
  // findByIdAndUpdate()
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    // check permissions 
    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).send('You are not allowed to perform this action!!!');
    }

    // update the hoot
    const updatedHoot = await Hoot.findByIdAndUpdate(
      req.params.hootId,
      req.body,
      { new: true }
    );

    updatedHoot._doc.author = req.user;

    res.status(200).json(updatedHoot);
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
})

// DELETE a hoot!!!
// DELETE /hoots/:hootId
router.delete('/:hootId', verifyToken, async (req, res) => {
  // route here
  // find the hoot to be deleted
  // check the permissions 
  // then delete
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).send('You are not allowed to perform this action!!!');
    }
    // delete the hoot from the db
    const deletedHoot = await Hoot.findByIdAndDelete(req.params.hootId);
    res.status(200).json(deletedHoot);
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
})


// create a comment
// method: POST
// path: /hoots/:hootId/comments
router.post('/:hootId/comments', verifyToken, async (req, res) => {
  // update the author
  // get the hoot from the id
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.findById(req.params.hootId);
    hoot.comments.push(req.body);
    await hoot.save();

    const newComment = hoot.comments[hoot.comments.length - 1];
    newComment._doc.author = req.user;

    // respond with the new comment
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
})

module.exports = router;
