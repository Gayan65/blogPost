import express from "express";
import { User } from "../schemas/User.js";
import { Blog } from "../schemas/Blog.js";
import { Comment } from "../schemas/Comment.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const user_router = express();
user_router.use(bodyParser.urlencoded({ extended: false }));
const saltRounds = 10;

//Getting All users (Admin Use Only).........
user_router.get("/users/all", async (req, res) => {
  try {
    await User.find().then((users) => {
      return res.status(200).json({
        success: true,
        allUsers: users,
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

//Creating users
user_router.post("/user/create", async (req, res) => {
  try {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      const user = new User({
        username: req.body.username,
        password: hash,
        fname: req.body.fname,
        nickName: req.body.nickName,
        createDate: req.body.createDate,
        admin: req.body.admin,
      });

      await User.findOne({ username: user.username }).then(
        async (foundUser) => {
          if (!foundUser) {
            await user.save().then((user) => {
              return res.status(200).json({
                success: true,
                message: `${user.username} saved successfully to DB!`,
              });
            });
          } else {
            return res.status(200).json({
              success: false,
              message: "User already exists ! ",
            });
          }
        }
      );
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Getting a user from the database (Admin only) ......
user_router.get("/user/:username", async (req, res) => {
  let username = req.params.username;
  console.log(username);
  try {
    await User.findOne({ username: username }).then((user) => {
      if (!user) {
        res.status(400).json({
          success: false,
          message: `${username} not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `${user.username} found successfully`,
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
});

//User Login
user_router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    await User.findOne({ username: username }).then((user) => {
      if (!user) {
        return res.status(200).json({
          success: false,
          message: "User not found ! ",
        });
      } else {
        bcrypt.compare(password, user.password, function (err, result) {
          // result == true
          if (user.username == username && result) {
            return res.status(200).json({
              success: true,
              message: "User login successfully ! ",
              user: user,
            });
          } else {
            return res.status(200).json({
              success: false,
              message: "Invalid password",
            });
          }
        });
      }
    });
  } catch (error) {
    console.error(err);
  }
});

//Getting a user from user ID

user_router.get("/profile/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    await User.find({ _id: userId }).then((user) => {
      if (user.length > 0) {
        return res.status(200).json({
          success: true,
          message: "user found successfully !",
          user: user,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "user not found !",
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

//Deleting a User
user_router.delete("/user/delete/:id", async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id).then((deletedUser) => {
    if (deletedUser) {
      return res.status(200).json({
        success: true,
        message: "User Deleted successfully !",
      });
    }
  });
});

export default user_router;
