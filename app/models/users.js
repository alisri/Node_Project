const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const uniqueString = require('unique-string');
const mongoosePaginate = require('mongoose-paginate');


const userSchema = mongoose.Schema({
    name: {type : String , unique: true, require : true},
    username: {type : String , require : true},
    admin : {type : Boolean, default : 0},
    password: {type: String, require : true},
    rememberToken : {type: String, default: null },
}, {timestamps : true, toJSON: {virtuals: true}});

userSchema.plugin(mongoosePaginate);

userSchema.pre('save', function(next){
    let salt = bcrypt.genSaltSync(15);
    let hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
})

userSchema.methods.comparePassword = function(password)
{
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.setRememberToken = function (res)
{
    const token = uniqueString();
    res.cookie('remember_token', token, {maxAge: 1000*60*60*24*30, httpOnly: true, signed: true});
    this.update({rememberToken: token}, err=> {
        if(err) console.log(err);
    });
}

userSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'user'
})

module.exports = mongoose.model('User', userSchema);