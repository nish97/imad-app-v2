var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').pool;

var config = {
     user: 'nish97',
     database: 'nish97',
     host: 'db.imad.hasura-app.io',
     port: '5432',
     password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
    
    'article-one' : {
        title:'Article one|hii!!',
        heading:'ARTICLE ONE',
        date: 'Sep 5,2016',
        body: `
      <p>
         hii iam nishanth i like this course it helps me to learn abouut how to develop a webapp article one
      </p>
       `},
     
     'article-two' :{
       title:'Article two|hii!!',
        heading:'ARTICLE TWO',
        date: 'Sep 5,2016',
        body: `
      <p>
         hii iam nishanth i like this course it helps me to learn abouut how to develop a webapp article two
      </p>
     `},
     
     'article-three' :{ 
        title:'Article three|hii!!',
        heading:'ARTICLE THREE',
        date: 'Sep 5,2016',
        body: `
      <p>
         hii iam nishanth i like this course it helps me to learn abouut how to develop a webapp article three
      </p>`},
};
function createTemplate(data){
  var title=data.title;
  var heading=data.heading;
  var date=data.date;
  var body=data.body;
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
         ${date}
        </div>
        <div>
        ${body}
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
var counter= 0;
app.get('/counter',function(req,res) {
    counter=counter + 1;
    res.send(counter.toString());
});
var pool = new pool(config);
app.get('/test-db', function (req, res) {
 pool.query('SELECT *FROM test' , function(err,result) {
     
    if (err)
     {
      res.status(500).send(err.toString());   
     }else
     {
         rs.send(JSON.stringify(result));
     }
 }); 
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:ArticleName', function (req, res) {
  var ArticleName=req.params.ArticleName;
  res.send(createTemplate(articles[ArticleName]));
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
