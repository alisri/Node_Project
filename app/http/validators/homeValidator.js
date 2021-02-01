const validator = require('./validator');
const { check } = require('express-validator/check');

class homeValidator extends validator {
    handle(){
        return [
                    check('title')
                            .not().isEmpty()
                                .withMessage('موضوع اعتراض معتبر نیست'),
                                
                    check('type')
                    .not().isEmpty()
                        .withMessage('فیلد نوع اعتراض نمی تواند خالی بماند'),
    

                    check('body')
                            .isLength({min: 10})
                                .withMessage('متن اعتراض می بایست بیشتر از 10 کاراکتر باشد')
        ]
        }

    handle2(){
        return [
                    check('response')
                            .isLength({min: 5})
                                .withMessage('متن پاسخ می بایست بیشتر از 5 کاراکتر باشد')
        ]
        }
}


module.exports = new homeValidator();