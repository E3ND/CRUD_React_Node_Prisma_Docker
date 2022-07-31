const cors = require("cors");

const express = require("express");

const todosRoutes = require("./todos.routes")

const app = express();

app.use(express.json());
app.use(cors());
app.use(todosRoutes);

app.get("/health", (req, res) => {
    return res.json("running");
})

app.listen(3333, () => console.log("Server is running!"));