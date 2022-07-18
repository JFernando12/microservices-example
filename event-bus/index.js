const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));

const events = [];

app.get("/events", (req, res) => {
    res.send(events);
})

app.post("/events", async(req, res) => {
    const event = req.body;

    events.push(event);

    await axios.post("http://posts-clusterip-srv:4000/events", event);
    await axios.post("http://comments-srv:4001/events", event);
    await axios.post("http://query-srv:4002/events", event);
    await axios.post("http://moderation-srv:4003/events", event);

    res.send({ status: "OK" });
})

app.listen(4005, () => {
    console.log("Server on port 4005");
})