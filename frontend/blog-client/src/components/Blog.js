import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import qs from "qs";

function Blog(props) {
    const [editClicked, setEditClicked] = useState(false);
    const [titleValue, setTileValue] = useState("");
    const [contentValue, setContentValue] = useState("");

    let { state } = useLocation();
    const { title, content, _id } = state;
    //console.log(title, content, _id)

    async function handleClickDelete() {
        await axios.delete(`http://localhost:4000/user/blog/${_id}`)
            .then((response) => {
                console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    function handleClickEdit() {
        setEditClicked(true);
        setTileValue(title);
        setContentValue(content);
    }

    async function handleClickOk() {
        console.log(titleValue, contentValue);

        const data = qs.stringify({
            'title': titleValue,
            'content': contentValue
        });

        await axios.patch(`http://localhost:4000/blog/update/${_id}`, data)
            .then((response) => {
                console.log(response.data);
                setEditClicked(false);
            })
            .catch(error => console.log(error));
    }
    return (
        <div>
            <h1> From Blog </h1>
            {editClicked ?

                <form>
                    <h3>Title : <input type="text" value={titleValue} onChange={(e) => setTileValue(e.target.value)} name="title" /> </h3>
                    <p>Content : <input type="text" value={contentValue} onChange={(e) => setContentValue(e.target.value)} name="content" /> </p>
                </form> :
                <div>
                    <h3>Title : {titleValue.length > 0 ? titleValue : title} </h3>
                    <p>Content : {contentValue.length > 0 ? contentValue : content} </p>
                </div>
            }
            {editClicked ? <button onClick={handleClickOk}>Ok</button> : <button onClick={handleClickEdit}>Edit</button>}
            <button onClick={handleClickDelete} >Delete</button>
        </div>
    );
}

export default Blog;