const { randomBytes } = require('crypto');
const cors = require("cors");
const express = require('express');
const morgan = require('morgan');
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(morgan("dev"));

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post("/posts/:id/comments", async(req, res) => {
    const id = randomBytes(4).toString("hex");
    const { content } = req.body;

    const comment = {
        id,
        content,
        status: "pending"
    }

    const comments = commentsByPostId[req.params.id] || [];
    comments.push(comment);
    commentsByPostId[req.params.id] = comments;

    await axios.post("http://event-bus-srv:4005/events", {
        type: "CreateComment",
        data: {
            ...comment,
            postId: req.params.id
        }
    });

    res.status(201).json(comment);
})

app.post("/events", async(req, res) => {
    const { type, data } = req.body;

    if(type === "ModerationComment") {
        const comments = commentsByPostId[data.postId];
        const comment = comments.find(comment => comment.id === data.id);
        comment.status = data.status;
        comment.content = data.content;
        await axios.post("http://event-bus-srv:4005/events", {
            type: "UpdatedComment",
            data: {
                ...data
            }
        })
    }

    res.send({});
})

app.listen(4001, () => {
    console.log("Server on port 4001");
})