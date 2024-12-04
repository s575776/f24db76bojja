// app.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const connectionString = process.env.MONGO_CON;

const mongoose = require('mongoose');

mongoose.connect(connectionString);

var db = mongoose.connection;

// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
  console.log("Connection to DB succeeded");
});

// Route imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
const pickRouter = require('./routes/pick');
const resourceRouter = require('./routes/resource');
const fossilsRouter = require('./routes/fossils');  // Updated route for fossils

// Schema definition
const fossilSchema = new mongoose.Schema({
  name: String,
  age: String,
  location: String
});

const Fossil = mongoose.models.Fossil || mongoose.model('Fossil', fossilSchema);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
function(username, password, done) {
Account.findOne({ username: username })
.then(function (user){
if (err) { return done(err); }
if (!user) {
return done(null, false, { message: 'Incorrect username.' });
}
if (!user.validPassword(password)) {
return done(null, false, { message: 'Incorrect password.' });
}
return done(null, user);
})
.catch(function(err){
return done(err)
})
})
)
// Database seeding function
async function recreateDB() {
  await Fossil.deleteMany();
  
  let instance1 = new Fossil({ name: 'Trilobite', age: '500 million years', location: 'Utah' });
  let instance2 = new Fossil({ name: 'Ammonite', age: '200 million years', location: 'Morocco' });
  let instance3 = new Fossil({ name: 'Megalodon Tooth', age: '15 million years', location: 'California' });

  await instance1.save().then(doc => {
    console.log("First fossil saved:", doc);
  }).catch(err => {
    console.error(err);
  });

  await instance2.save().then(doc => {
    console.log("Second fossil saved:", doc);
  }).catch(err => {
    console.error(err);
  });

  await instance3.save().then(doc => {
    console.log("Third fossil saved:", doc);
  }).catch(err => {
    console.error(err);
  });
}

let reseed = true;
if (reseed) {
  recreateDB();
}

// Express app setup
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/fossils', fossilsRouter);  // Updated route for fossils
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);
app.use('/resource', resourceRouter);

// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account'));
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Error handling
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
