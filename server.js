var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
     user: 'nish97',
     database: 'nish97',
     host: 'db.imad.hasura-app.io',
     port: '5432',
     password: 'db-nish97-35283'
};

var app = express();
app.use(morgan('combined'));
function createTemplate(data){
  var title=data.title;
  var heading=data.heading;
  var date=data.date;
  var content=data.content;
  var htmlTemplate= `
  <html>
    <head>
       <title>
         ${title}
       </title>
       <meta name="viewport" content="width=device-width,initial-scale=1" />
       <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
      <div class="container">
        <div>
          <a href="/"> Home </a>
        </div>
        <hr/>
        <h3>
         ${heading}
        </h3>
        <div>
         ${date.toDateString()}
        </div>
        <div>
        ${content}
        </div>
        </div>
    </body>
  </html>
  `;
  return htmlTemplate;

}
var names= [];
app.get('/submit-name',function (req,res){
  var name = req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});
var pool = new Pool(config);
app.get('/test-db', function (req, res) {
 pool.query('SELECT *FROM article',function(err , result) {
     if (err)
     {
      res.status(500).send(err.toString());   
     }
     else
     {
      res.send(JSON.stringify(result.rows));
     }
 }); 
});
var counter= 0;
app.get('/counter',function(req,res) {
    counter=counter + 1;
    res.send(counter.toString());
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/articles/:ArticleName', function (req, res) {
  pool.query("SELECT * FROM article WHERE title =$1",[req.params.ArticleName],function(err, result){
      if(err){
      res.status(500).send(err.toString());
      } else{
      if(result.rows.length ===0){
          res.status(404).send(err.toString());
      }
      else{
      var ArticleData = result.rows[0];
      res.send(createTemplate(ArticleData));
      }
     }
  });
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
