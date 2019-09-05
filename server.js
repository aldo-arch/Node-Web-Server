const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url} `;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log')
    }
  });
  //console.log(`${now}: ${req.method} ${req.url} `);
  next();
});

/* app.use((req ,res ,next) => {
  res.render('maintance.hbs');
}); */

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
   return new Date().getFullYear()
});

hbs.registerHelper('screamit', (text) =>{
  return text.toUpperCase();
});


app.get('/', (req,res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Hi Fellas',
  });
});

app.get('/projects' , (req,res) => {
  res.render('projects.hbs',{
    pageTitle:'Projects'
  });
});

app.get('/about', (req, res) => {
  //res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    Errormessage: 'Error 404 unable to handle content'
  })
});

app.listen(port, () => {
  console.log(`Server is up in port ${port}`);
});

/* app.listen(3000, () => {
  console.log('Server is up in port 3000')
});  static port */
