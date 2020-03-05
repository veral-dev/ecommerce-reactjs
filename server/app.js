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
require('./configs/session.config')(app)
require('./configs/preformatter.config')(app)
require('./configs/locals.config')(app)
// Hbs setup
require('./configs/hbs.config')


app.use(flash());

// Routes 
app.use("/", require("./routes/index.routes"));
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/products', require('./routes/products.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/files', require('./routes/files.routes'))

app.use((req, res) => { res.sendFile(__dirname + "/public/index.html") })

module.exports = app;