const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb+srv://avahurst:temp0raryWi11Rep1aceAfterHand-1n@avahurst.xo18im9.mongodb.net/?retryWrites=true&w=majority&appName=AvaHurst')
        .then((client) => {
            dbConnection = client.db()
            console.log('Connection Successful')
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}