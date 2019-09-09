const express = require('express')
const app = express()

const port = 3000
const axios = require('axios');
const https = require('https')
var bodyParser = require('body-parser')
const querystring = require('querystring');

const clientID = ""
const clientSecret=""

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Hello World!')
    console.log('hello')
});

app.post('/auth/token',(req,res)=>{

    const instance = axios.create({
        httpsAgent: new https.Agent({  
          rejectUnauthorized: false
        })
      });

    console.log(req.body.code)
    var url = "https://localhost:9443/oauth2/token"

    instance.post(url,querystring.stringify({
        'grant_type':'authorization_code',
        'code':req.body.code,
        'redirect_uri':'http://localhost:8080/'

    }),{headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': 'Basic [Base64 encoded clientID:ClientSecret]'
    }}).then ((result)=>{
        res.send(result.data)
        // console.log()
    }).catch((err)=>{
        console.log(err)
    })
    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))