const express = require('express')
const app = express();
const path = require("path")
const mainRouter = require('./routes/index')
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use("/api/v1", mainRouter)

app.get("/", (req,res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
})

app.listen(3000, () => {
    console.log("Port is running")
})
