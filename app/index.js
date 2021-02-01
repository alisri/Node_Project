const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const Helpers = require('app/helpers');
const methodOverride = require('method-override');
const rememberLogin = require('app/http/validators/rememberLogin');
const expressLayouts = require('express-ejs-layouts');
const busboy = require('connect-busboy'); //middleware for form/file upload


module.exports = class App {
    constructor()
    {
        this.setupExpress();
        this.setConfig();
        this.setMongoConnection();
        this.setRouters();
    }

    setupExpress()
    {
        const server = http.createServer(app);
        server.listen(8080, () => console.log(`server is running on port ${8080}`));
    }
    setMongoConnection()
    {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/port', { useNewUrlParser : true});
        mongoose.set('useCreateIndex', true);
    }
    setConfig()
    {
        require('app/passport/passport-local');
        app.use(express.static('public'));
        // app.use(expressLayouts);
        app.set('view engine', 'ejs');
        app.set('views', path.resolve('./resource/views'));
        app.set("layout" , 'admin/master');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(methodOverride('_method'));
        app.use(validator());
        app.use(session({
        secret: 'mysecretkey',
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({mongooseConnection : mongoose.connection})
        }));
        app.use(cookieParser('mysecretkey'));
        app.use(flash());
        app.use(busboy());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(rememberLogin.handle);

        app.use((req, res, next) => {
            app.locals = new Helpers(req, res).getObjects();
            next();
        })
    }
    setRouters()
    {
        app.use(require('./routes/web'));
    }
}
