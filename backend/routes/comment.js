import express from "express";
import { Comment } from "../schemas/Comment.js";
import bodyParser from "body-parser";

const comment_router = express();
comment_router.use(bodyParser.urlencoded({ extended: false }));

comment_router.post("/add/comment", async (req, res) => {
  const { content, userId, blogId } = req.body;
  const comment = new Comment({
    content: content,
    user: userId,
    blog: blogId,
  });
  try {
    await comment.save().then((comment) => {
      if (comment) {
        res.status(200).json({
          success: true,
          message: "comment added successfully !",
          comment: comment,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "comment not added successfully !",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default comment_router;
