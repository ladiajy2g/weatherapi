const express = require('express');
const bodyParser = require('body-parser');
// const request = require('superagent');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/', (req, res) => {
    const query = req.body.city,
    myMetrics = 'metrics',
    myAppID = '1234567890-012'
    url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&units='+ myMetrics +'&appid='+ myAppID;
    
    https.get(url, (response) =>{

        response.on('data', (data) =>{
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const iconImageURL = 'https://openweathermap.org/img/wn/'+ icon + '@2x.png'

            res.write('The weather is currently ' + weatherDescription);
            res.write('<p>The temperature in Lagos is ' + temp + 'degrees </p>');
            res.write('<img src="'+ iconImageURL +'"></img>');
            res.send();
        })
    })
});

app.listen(3000, (req, res) => {
    console.log('Server listening on port 3000...');
});


    
    
