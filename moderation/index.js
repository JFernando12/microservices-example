const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(morgan("dev"));

app.post("/events", async(req, res) => {
    const {type, data} = req.body;

    if (type === "CreateComment") {
        data.status = (data.content.includes("orange")) ? "rejected" : "aproved";
        await axios.post("http://localhost:4005/events", {
        type: "ModerationComment",
            data
        }) 
    }
    res.send({});
})

app.listen(4003, () => {
    console.log("Server on port 4003");
})