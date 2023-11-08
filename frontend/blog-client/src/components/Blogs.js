import axios from "axios";
import React, { useEffect, useState } from "react";


function Blogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/blogs/all')
            .then(response => {
                //Edited here
                if (response.data.success) {
                    console.log(response.data.blogs)
                    setBlogs(response.data.blogs)
                }
            })
            .catch(err => console.log(err))
    }, []);


    return (
        <div>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog._id}> {blog.title}  {blog.content} {blog.user.username}</li>
                ))}
            </ul>
        </div>
    );
}

export default Blogs;