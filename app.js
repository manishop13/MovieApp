var express = require('express');
var request = require('request')

var app = express();

app.set('view engine','ejs');
app.use(express.static("public"))

app.get('/',(req,res) =>{
    res.render('search');
})
const PORT=3000;
app.get('/results', (req,res) =>{
   var query = req.query.search;
   var url = `http://www.omdbapi.com/?apikey=2c6e7a77&s=${query}`;
   if (query === ""){
       res.render("error")
   }
   else{
    request(url,(error,response,body) =>{
        if(!error && response.statusCode === 200){
            var parsedData = JSON.parse(body);
            res.render('results', {data: parsedData})
        }
        
        })
   }
    
})


app.listen(PORT,() =>{
    console.log(`Server Listening on port ${PORT}`);
})