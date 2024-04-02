const mongoose = require('mongoose');

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    mongoose.connect('mongodb+srv://avahurst:temp0raryWi11Rep1aceAfterHand-1n@avahurst.xo18im9.mongodb.net/?retryWrites=true&w=majority&appName=AvaHurst', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        dbConnection = mongoose.connection;
        console.log('Connection Successful');
        cb();
      })
      .catch(err => {
        console.error('Connection Error:', err);
        cb(err);
      });
  },
  getDb: () => dbConnection,
};
