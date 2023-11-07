import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate, Link } from "react-router-dom";

function UserBlog() {
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);
    const user = sessionStorage.getItem('user');
    
    useEffect(() => {
        if (user === '' || user === null) {
            navigate('/login');
        }
        else {
            const userObj = JSON.parse(user)
            const userId = userObj._id;
            const data = qs.stringify({
                'userId': userId
            });

            axios.post('http://localhost:4000/blogs/user', data)
                .then(response => {
                    console.log(response.data);
                    if (response.data.success) {
                        setBlogs(response.data.blogs);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
        // eslint-disable-next-line
    }, [])



    return (
        <div>
            <ul>
                {blogs.length > 0 ? blogs.map((blog) => (
                    <li key={blog._id}> <Link to={'/blog'} state={blog}> {blog.title}  {blog.content} </Link> </li>
                )) : <li> No blogs to display </li>}
            </ul>
        </div>
    );
}

export default UserBlog;