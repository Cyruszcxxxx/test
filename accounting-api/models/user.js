const crypto = require('crypto');
const { argv } = require('yargs');
const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');

const adminSchema = new mongoose.Schema({

    name: { type: String, required: true, default: '' },

    phone: { type: Number, required: true, default: '' },

    email: { type: String,  required: true, default: '' },

    password: {
        type: String,
        required: true,
        default: crypto
            .createHash('md5')
            .update(argv.auth_default_password || 'root')
            .digest('hex'),
    },

    create_time: { type: Date, default: Date.now },

    update_time: { type: Date, default: Date.now },
});
module.exports = mongoose.model('User', adminSchema);
