const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

const posts = {};

const eventHandler = (type, data) => {
  if (type === "CreatePost") {
    const { id, title } = data;
    const post = {
      id,
      title,
      comments: []
    };
    posts[id] = post;
  }

  if (type === "CreateComment") {
    const { id, content, status, postId } = data;

    const comment = {
      id,
      content,
      status
    };

    const post = posts[postId];
    post.comments.push(comment);
  }

  if(type === "UpdatedComment") {
    const post = posts[data.postId];
    const comment = post.comments.find(comment => comment.id === data.id);
    comment.status = data.status;
    comment.content = data.content;
  }
}

app.get("/posts", (req, res) => {
  console.log(posts);
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  eventHandler(type, data);

  res.send({});
});

app.listen(4002, async() => {
  console.log("Server on port 4002");
  const res = await axios.get("http://event-bus-srv:4005/events");
  const events = res.data;
  console.log(events);
  for(const event of events) {
    console.log("Event: ", event.type);
    eventHandler(event.type, event.data);
  }
});
