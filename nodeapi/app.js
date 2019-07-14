const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();


//db
mongoose.connect("mongodb+srv://ronins:ronins@socialreactapp-ppwfw.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
.then(() => console.log("DB connected"))

mongoose.connection.on("error" , err =>{
	console.log("DB connection error :- " + err)
})

//bring in routs

const postRoutes = require("./routes/post");

//middleware
app.use(morgan('dev'))

app.use("/", postRoutes);


const port = 8080;
app.listen(port, ()=> {
	console.log(`A node js api listening on port ${port}`)
})