const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const app = express();


//db
mongoose.connect("mongodb+srv://ronins:ronins@socialreactapp-ppwfw.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
.then(() => console.log("DB connected"))

mongoose.connection.on("error" , err =>{
	console.log("DB connection error :- " + err)
})

//bring in routs

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());

app.use("/", postRoutes);
app.use("/", authRoutes);


const port = 8080;
app.listen(port, ()=> {
	console.log(`A node js api listening on port ${port}`)
})