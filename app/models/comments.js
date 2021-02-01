const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const commentSchema = Schema({
     user:   { type: Schema.Types.ObjectId, ref : 'User' },
     title : { type : String , required : true},
     type :  { type : String , required : true},
     body :  { type : String , required : true},
     time :  { type : String , default : '00:00:00' , required : true},
     checked : {type : Boolean, default : 0},
     respond: {type: String, default: ''}
} , { timestamps : true });

commentSchema.plugin(mongoosePaginate);


commentSchema.methods.typeToPersian = function() {
    switch (this.type) {
        case 'food':
            return 'سالن غذا خوری'
            break;
        case 'training':
            return 'سالن ورزش'
            break;
        case 'wc':
            return 'سرویس بهداشتی'
            break;
        case 'educational':
            return 'واحد آموزش'
            break;
        case 'finance':
            return 'بخش مالی'
            break;
        case 'boss':
            return 'ریاست'
            break;
        case 'culture':
            return 'فرهنگی'
            break;
        case 'herasat':
            return 'حراست'
            break;
        case 'others':
            return 'غیره'
            break;
        default:
            return 'دیگر'
            break;
    }
}


module.exports = mongoose.model('Comment' , commentSchema);