import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "./NavBar";

function UserBlog() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    const [userObj, setUserObj] = useState({});

    const [blogs, setBlogs] = useState([]);
    const user = sessionStorage.getItem('user');

    useEffect(() => {
        if (user === '' || user === null) {
            navigate('/login');
            setAuth(false);
        }
        else {
            setAuth(true);
            const userObj = JSON.parse(user)
            setUserObj(userObj);
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
            <NavBar auth={true} user={auth ? userObj.username : null} />
            <div className="container-fluid body-custom-css">
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {blogs.length > 0 ? blogs.map((blog) =>
                            <div key={blog._id} className="col"> <Link to={'/blog'} state={blog}>
                                <div className="card border-success mb-3" style={{ maxWidth: '18rem' }}>
                                    <div className="card-header bg-transparent border-success">From {blog.user.username} </div>
                                    <div className="card-body text-success">
                                        <h5 className="card-title">{blog.title} </h5>
                                        <p className="card-text"> {blog.content} </p>
                                    </div>
                                    <div className="card-footer bg-transparent border-success">Footer</div>
                                </div> </Link>
                            </div>
                        ) : <li> No blogs to display </li>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserBlog;