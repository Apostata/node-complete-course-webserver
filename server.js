const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;//pega a porta do sistema

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');// set a template view engine

app.use((req, res, next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err)=>{
		if(err){
			console.log('Unable to append to server.log.');
		}
	})
	next();
});

/*app.use((req, res, next)=>{
	res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));//using middleware

hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});

app.get('/', (req, res)=>{
	res.render('home.hbs',{
		pageTitle: "Home Page",
		welcomeMessage:"Welcome to My first Node.js site"
	});
	/*res.send({
		name: "Rene",
		likes:[
			'Programming',
			'RPG'
		]
	});*/
});

app.get('/about', (req, res)=>{
	res.render('about.hbs',{
		pageTitle: "About Page"
	}); //rederiza o arquivo com o template engine setado
});

app.get('/portifolio', (req, res)=>{
	res.render('portifolio.hbs',{
		pageTitle: "Portifolio page",
		welcomeMessage:"Portifolio page Here!"
	}); //rederiza o arquivo com o template engine setado
});

app.get('/bad', (req, res)=>{
	res.send({
		errorMessage:"Unable to handle request."
	});
});
app.listen(port, ()=>{
	console.log(`Server is running at port ${port}`);
});