const express = require('express');
const app = express();
const { randomBytes } = require('crypto');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(morgan("dev"))

let posts = {};

app.get("/posts", (req, res) => {
    res.send(posts);
})

app.post("/posts", async(req, res) => {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;
    const post = {
        id,
        title
    }
    posts[id] = post;

    await axios.post("http://event-bus-srv:4005/events", {
        type: "CreatePost",
        data: {
            id,
            title
        }
    })

    res.status(201).json(post)
})

app.post("/events", (req, res) => {
    console.log("Received: ", req.body.type);
    res.send({});
})

app.listen(4000, () => {
    console.log("Server on port 4000");
    console.log("Version 3");
})