const validator = require('./validator');
const { check } = require('express-validator/check');

class loginValidator extends validator {
    handle(){
        return [
                    check('name')
                            .not().isEmpty()
                                .withMessage('شماره دانشجویی معتبر نیست'),

                    check('password')
                            .isLength({min: 8})
                                .withMessage('کلمه عبور معتبر نیست')
        ]
    }
    handle2(){
        return [
            check('name')
            .not().isEmpty()
                .withMessage('شماره دانشجویی معتبر نیست'),

           check('password')
            .isLength({min: 8})
                .withMessage('کلمه عبور معتبر نیست'),

           check('username')
            .not().isEmpty()
                .withMessage('نام کاربری معتبر نیست'),

        ]
    }

    handleReport() {
        return [
            check('name')
            .not().isEmpty()
                .withMessage('نام را وارد کنید'),

            check('title')
            .not().isEmpty()
                .withMessage('لطفا موضوع را وارد کنید'),

            check('body')
            .isLength({min: 10})
                .withMessage('متن وارد شده می بایست بیشتر از ده کاراکتر باشد')
        ]
    }
}

module.exports = new loginValidator();