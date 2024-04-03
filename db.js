import pkg from 'mongoose';
const { connect, connection } = pkg;

let dbConnection;

export function connectToDb(cb) {
  connect('mongodb+srv://avahurst:temp0raryWi11Rep1aceAfterHand-1n@avahurst.xo18im9.mongodb.net/?retryWrites=true&w=majority&appName=AvaHurst', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      dbConnection = connection;
      console.log('Connection Successful');
      cb();
    })
    .catch(err => {
      console.error('Connection Error:', err);
      cb(err);
    });
}
export function getDb() { return dbConnection; }
