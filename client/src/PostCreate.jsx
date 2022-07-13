import React from "react";
import { useState } from "react";
import axios from "axios";

function PostCreate() {
    const [title, setTitle] = useState("");

    const onSubmit = async(e) => {
        e.preventDefault();

        await axios.post("http://localhost:4000/posts", {
            title
        });

        setTitle("");
    };



    return(
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="">Title</label>
                    <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default PostCreate;