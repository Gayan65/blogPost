import express from "express";
import { Blog } from "../schemas/Blog.js";
import bodyParser from "body-parser";

const blog_router = express();
blog_router.use(bodyParser.urlencoded({ extended: false }));

//Creating a blog
blog_router.post("/blog/save", async (req, res) => {
  const { title, content, userId } = req.body;

  const blog = new Blog({
    title: title,
    content: content,
    user: userId,
  });

  try {
    await blog.save().then((blog) => {
      return res.status(200).json({
        success: true,
        message: `${blog.title} Blog saved successfully !`,
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//Get a blog belongs to a user
// According user id sends json response with or without blogs
blog_router.post("/blogs/user", async (req, res) => {
  try {
    const user = req.body.userId;
    await Blog.find({ user: user })
      .populate("user")
      .then((blogs) => {
        if (blogs.length <= 0) {
          return res.status(200).json({
            success: false,
            message: "Blogs not found !",
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "Blogs found successfully !",
            blogs: blogs,
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

//Get all blogs(Home page)....
blog_router.get("/blogs/all", async (req, res) => {
  try {
    await Blog.find()
      .populate("user")
      .populate("comment")
      .then((blogs) => {
        if (blogs.length <= 0) {
          res.status(200).json({
            success: false,
            message: "No blogs to display !",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Blogs found successfully !",
            blogs: blogs,
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

// Delete a blog
blog_router.delete("/user/blog/:id", (req, res) => {
  const blogId = req.params.id;
  try {
    Blog.findByIdAndDelete(blogId).then((deletedBlog) => {
      if (deletedBlog) {
        return res.status(200).json({
          success: true,
          message: `${deletedBlog.title} deleted successfully !`,
          blog: deletedBlog,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Blog can not be found",
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

//Update a blog
blog_router.patch("/blog/update/:id", async (req, res) => {
  const blogId = req.params.id;
  try {
    await Blog.findOne({ _id: blogId }).then(async (blog) => {
      if (blog) {
        await Blog.findByIdAndUpdate(
          blogId,
          { $set: req.body },
          { new: true }
        ).then((updatedBlog) => {
          res.status(200).json({
            success: true,
            message: "Blog updated successfully !",
            new_blog: updatedBlog,
            pre_blog: blog,
          });
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Blog can not be found",
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

//Get a specific a blog belongs to blog id

blog_router.get("/blog/:id", async (req, res) => {
  const blogId = req.params.id;
  try {
    await Blog.find({ _id: blogId })
      .populate("user")
      .populate({
        path: "comment",
        populate: {
          path: "user",
        },
      })
      .then((blog) => {
        if (blog.length > 0) {
          res.status(200).json({
            success: true,
            message: "Blog found successfully !",
            blog: blog,
          });
        } else {
          res.status(200).json({
            success: false,
            message: "Blog can not be found !",
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

export default blog_router;
