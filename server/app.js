require('dotenv').config();

const flash = require("connect-flash");

// Database
require("./configs/mongoose.config");
// Debugger
require('./configs/debugger.config')
// App
const express = require("express");
const app = express();
// Middleware Setup
require('./configs/middleware.config')(app)
// Express View engine setup
require('./configs/preformatter.config')(app)
require('./configs/views.config')(app)
require('./configs/locals.config')(app)
// Hbs setup
require('./configs/hbs.config')


app.use(flash());
require('./passport')(app);


// Routes 
app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/auth.routes"));


module.exports = app;
