import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import user_route from "./routes/user.js";
import blog_router from "./routes/blog.js";
import comment_router from "./routes/comment.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(user_route);
app.use(blog_router);
app.use(comment_router);

app.use(express.static("public"));
//app.use(bodyParser.json());

await mongoose
  .connect("mongodb://127.0.0.1:27017/blogpost_db")
  .then(() => console.log("DB Connected!"));

app.listen(port, () => {
  console.log(`Server running port number ${port}`);
});
