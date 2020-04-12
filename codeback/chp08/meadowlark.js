var express = require("express");
var exphbs  = require('express-handlebars');
var fortune = require('./lib/fortune.js');
var bodyParser = require('body-parser')

var app = express();
var hbs = exphbs.create({ 
    helpers:{
        section: function(name, block){
                if(!this._sections) this._sections = {};
                this._sections[name] = block.fn(this);
                return null;
        }
    }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

app.engine('handlebars',hbs.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});
    
app.get('/', function(req, res){
    res.render("home");
});

app.get('/about', function(req, res){
    res.render('about', {
         fortune: fortune.getFortune() ,
         pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function(req, res){
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res){
    res.render('tours/request-group-rate');
});

//    form post 表单处理
app.get("/newsletter", function(req, res){
    res.render("newsletter", {csrf:"CSRF token goes here"});
})

app.post('/process', function(req, res){
    console.log("form "+ req.query.form);
    console.log("form name" + req.body.name);
    console.log("form _csrf" + req.body._csrf);
    console.log("form email" + req.body.email);
    res.redirect(303,'/thank you')

})
//  ajax 表单处理
app.get("/newsletterAjax", function(req, res){
    res.render("newsletterAjax", {csrf:"CSRF token goes here"});
})

app.post('/ajaxprocess', function(req, res){
    console.log(req.body.username)
    if(req.xhr || req.accepts("json, html") === 'json'){
        
        res.send({ success: true });
    } else {
        res.redirect(303, '/thank-you');
    }

})
//   查看浏览器请求头
app.get('/headers', function(req, res){
    res.set("Content-Type", 'text/plain');
    var s = "";
    for (var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s)
});
// 定制 404 页面
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

//  定制 500 页面
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:'+ app.get('port')+';press Ctrl-C to terminate');
});
