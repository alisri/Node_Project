const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const reportSchema = Schema({
     name: {type : String , require : true},
     title : { type : String , required : true},
     body :  { type : String , required : true},
} , { timestamps : true });

reportSchema.plugin(mongoosePaginate);



module.exports = mongoose.model('Report' , reportSchema);