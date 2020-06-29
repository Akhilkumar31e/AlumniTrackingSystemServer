var mongoose = require('mongoose');
const User = require('./user');

var Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default:'/assets/images/profile_pic.png'
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;