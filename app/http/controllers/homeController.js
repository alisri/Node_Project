const controller = require('app/http/controller');
const Comment = require('app/models/comments');
const User = require('app/models/users');
const Report = require('app/models/reports');
class homeController extends controller
{
    async index(req, res) 
    {
        const errors = req.flash('errors');
        let page = req.query.page || 1;
        const name = req.user.id;
        let comments = await Comment.paginate({}, { page , sort: {createdAt : 1} , limit: 7, populate: 'user'});
    res.render('homeIndex', {title: 'شکایات ثبت شده', errors, comments, name});
    }

    error404(req, res) 
    {
        res.render('error404', {title: '404'});
    }

    
    async index1(req, res, next)
    {
        const errors = req.flash('errors');
        res.render('home', {title: 'ثبت شکایت', errors});
    }

    async index2(req, res) 
    {
        let page = req.query.page || 1;
        const userId = req.user.id;
        const param = req.params.id;
        let comments = await Comment.paginate({}, { page , sort: {createdAt : 1} , limit: 7, populate: 'user'});
    res.render('homeIndex2', {title: 'متن شکایت', comments, userId, param});
    }

    async main(req, res, next)
    {
        const title = 'صفحه نخست';
        const id = req.user.id;
        const user = await User.findById(id);
        res.render('main', {title, user});
    }

    async store(req, res, next)
    {
        let status = await this.validationData(req);
        if(! status)
            return res.redirect('/home/new');

        let {title, body, type} = req.body;
        let newComment = new Comment({
            user : req.user._id,
            title,
            body,
            type
        });
        await newComment.save();
        return res.redirect('/home/list');  
    }
    async showReportForm(req, res, next)
    {
        const title = 'ارسال پیام';
        const errors = req.flash('errors');
        const message = req.flash('success');
        res.render('report', {errors, title, message});
    }

    async report(req, res, next)
    {
        let status = await this.validationData(req);
        if(!status)
            return res.redirect('/report');
        
        
        let {name, title, body} = req.body;
        let newReport = new Report({
            name,
            title,
            body
        });
        await newReport.save();
        let message = ['نظر شما با موفقیت ثبت شد']
        req.flash('success', message);
        return res.redirect('/report');
    }

    async destroy(req, res)
    {
        let comment = await Comment.findById(req.param.id);
        if(! comment){
            return res.json('چنین صفحه ای یافت نشد');
        }

        comment.remove();
        return res.redirect('/home/list');
    }
}


module.exports = new homeController();