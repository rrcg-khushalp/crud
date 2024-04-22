const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const router = express.Router();

router.use(express.json());

// create data
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(201).json(userAdded);
  } catch (err) {
    console.error(err);
    res.send(400).json({ err: err.message });
  }
});

// get data
router.get("/", async (req, res) => {
  try {
    const showAll = await User.find();
    res.status(200).json(showAll);
  } catch (err) {
    console.error(err);
    res.send(500).json({ err: err.message });
  }
});

//  get single user//GET SINGLE USER
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleUser = await User.findById({ _id: id });
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete User
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteUser);
  } catch (err) {
    console.error(err);
    res.send(500).json({ err: err.message });
  }
});

// update User
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updateUser);
  } catch (err) {
    console.error(err);
    res.send(500).json({ err: err.message });
  }
});

module.exports = router;
