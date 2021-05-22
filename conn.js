const mongoose = require('mongoose');
const config = require('./config')
const url = config.mongoUrl;

const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

connect.then(() => {
    console.log('Connection Successful');
}).catch((err) => {
    console.log(err);
});