import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

function CreateBlog() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const user = sessionStorage.getItem('user');
    const navigate = useNavigate();

    useEffect(() => {

        if(user === '' || user === null) {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    const userObj = JSON.parse(user);

    async function handleSubmit(event) {
        event.preventDefault();
        
        const data = qs.stringify({
            'title' : title,
            'content' : content,
            'userId' : userObj._id
        });

        await axios.post('http://localhost:4000/blog/save', data)
        .then((response)=> {
            console.log(response.data);
        }).catch(error => console.log(error));


        setTitle("");
        setContent("");
    }
    return(
        <div>
            <h1>Create Blog</h1>
            <form method="POST" onSubmit={handleSubmit}>
                <input type="text" placeholder="Blog Title" onChange={(e) => setTitle(e.target.value)} name="title" value={title}/>
                <input type="text" placeholder="Blog Content" onChange={(e) => setContent(e.target.value)} name="content" value={content}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateBlog;