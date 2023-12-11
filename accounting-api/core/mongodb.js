const consola = require('consola')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

mongoose.Promise = global.Promise

exports.mongoose = mongoose

exports.connect = () => {

    mongoose.connect('mongodb+srv://infor6150User:sTYVHPUeWmYy0Y8H@info6150fall2023.x0bvoyg.mongodb.net/userdb?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    mongoose.connection.on('error', error => {
        consola.error('connect db fail', error);
    })

    mongoose.connection.once('open', () => {
        consola.ready('connect db success')
    })

    autoIncrement.initialize(mongoose.connection)

    return mongoose
}
