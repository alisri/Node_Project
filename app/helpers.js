const path = require('path');

module.exports = class Helpers{
    constructor(req, res, next)
    {
        this.req = req;
        this.res = res;
    }
    getObjects()
    {
        return {
            auth: this.auth(),
            path: this.req.url,
            viewPath : this.viewPath,
        }
    }
    auth()
    {
        return {
            check: this.req.isAuthenticated(),
            user: this.req.user,
        }
    }

    viewPath(dir){
        return path.resolve(path.resolve('./resource/views') + '/' + dir);
    }


}

