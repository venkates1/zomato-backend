const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); //hashing the password

const userSchema = Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    lastname: {
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true
    },
    email: {
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    hash_password:{
        type:String,
        required:true
    },
    
    contact_number:{
        type:String
    },
    profilePicture:{ type:String }   
}, { timestamps: true });

userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10);  //auto generate a salt and hash
});

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password)
    }
}



module.exports = mongoose.model('user', userSchema)