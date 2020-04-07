var express = require("express");
var exphbs  = require('express-handlebars');
var fortune = require('./lib/fortune.js');
var app = express();
var hbs = exphbs.create({ /* config */ });

app.use(express.static('public'));

app.engine('handlebars',hbs.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
    next();
});
    
app.get('/', function(req, res){
    res.render("home")
})


app.get('/about', function(req, res){
 res.render('about', { fortune: fortune.getFortune() });
})

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
})

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:'+ app.get('port')+';press Ctrl-C to terminate')
})
