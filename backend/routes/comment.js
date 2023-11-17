import express from "express";
import { Comment } from "../schemas/Comment.js";
import { Blog } from "../schemas/Blog.js";
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
    await comment.save().then(async (comment) => {
      if (comment) {
        //Apply to edit blog by ID and

        await Blog.findOneAndUpdate(
          { _id: blogId },
          { $push: { comment: comment._id } },
          { new: true }
        ).then((updatedBlog) => {
          res.status(200).json({
            success: true,
            message: "Comment added successfully ! ",
            blog: updatedBlog,
          });
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
