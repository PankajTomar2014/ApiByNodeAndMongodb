const express = require("express");
const ChatScheema = require("../modals/chatSchema");
const StudentScheema = require("../modals/StudentScheema");

const chatRouter = express.Router();

chatRouter.get("/chatStudentById", async (req, res) => {
  try {
    ChatScheema.find({ users: { $elemMatch: { $eq: req.body._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await StudentScheema.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
