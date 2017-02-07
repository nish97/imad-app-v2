var express = require('express');
var morgan = require('morgan');
var path = require('path');

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
       <<link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
      <div class="container">
        <div>
          <a href="/">Home</a>
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
