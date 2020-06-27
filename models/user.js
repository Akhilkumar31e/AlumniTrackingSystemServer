var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const experienceSchema = new Schema({
    company: {
        type: String,
        required:true
    },
    start: {
        type: String,
        required: true
    },
    end:{
        type:String,
        default: 'present'
    },
    role:{
        type:String,
        required: true
    },
    desc:{
        type:String,
        default:null
    }
});

const userSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    rollnumber: {
        type: String,
        required:true,
        unique:true
    },
    branch: {
        type: String,
        required:true
    },
    yearofpassing: {
        type: Number,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    mobile: {
        type: Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    experience: [ experienceSchema ]
},{
    timestamps:true
});

const User = mongoose.model('User',userSchema);

module.exports = User;