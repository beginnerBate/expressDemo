var express = require("express");
var exphbs  = require('express-handlebars');
var fortune = require('./lib/fortune.js');
var app = express();
var hbs = exphbs.create({ /* config */ });

app.use(express.static('public'));

app.engine('handlebars',hbs.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
    res.render("home")
})

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
    ];

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
