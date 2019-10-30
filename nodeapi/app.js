const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
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
const userRoutes = require("./routes/user");

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({error : "Unauthorized"});
  }
});

const port = 8080;
app.listen(port, ()=> {
	console.log(`A node js api listening on port ${port}`)
})