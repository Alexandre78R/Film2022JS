const mongoose = require('mongoose');
const config = require('../config/config');

const dbUrl = config.userBDD;

const options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology : true
};

mongoose.connect(dbUrl, options, (error, client) => {
  if (error) {
    console.error("Error :", error);
  } else {
    // console.log('client BDD', client); 
    console.log('Connexion à la BDD');
  }
});

module.exports = {
  mongoose: mongoose,
};