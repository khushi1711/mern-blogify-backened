const http = require('http');
const express = require('express');
const usersRouter=require('./routes/users/usersRouter');
require("./config/database")();


//!server
const app=express();

//midddlewares
app.use(express.json());//pass incoming data
// Routes
app.use("/api/v1/users", usersRouter);


const server=http.createServer(app);

//!start the server
const PORT=process.env.PORT || 9080;
server.listen(PORT,console.log(`Server is running on port ${PORT}`));