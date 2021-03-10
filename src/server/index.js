const dotenv = require('dotenv');
dotenv.config();


const API_KEY='c42671487bfe1d54838001ec879c5b30'
console.log(`Your API key is ${API_KEY}`);

var path = require('path')
var cors=require('cors')


const fetch=require('node-fetch') 
const mockAPIResponse = require('./mockAPI.js')






const express = require('express')
const app = express()



var bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)


app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
    console.log('Example app listening on port 8082!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/accessapi', async function (req, res){
    let text =req.body;
    
    const APIURL=`https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&of=json&txt=${text}&lang=en`

    
    const APIresponse= await fetch(APIURL)
    const data=await APIresponse.json()
    
    res.send(data)
})