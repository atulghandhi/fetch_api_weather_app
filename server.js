//Empty object to act as the endpoint to all our
const projectData = {}

//express server, install and use
const express = require('express');
const app = express();

//body parser middleware to translate between json/sting for server/local communication
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors for browser server communication without security interruptions
const cors = require('cors');
app.use(cors());

//main project root folder
app.use(express.static('website'));

//set up server with listen method
const port = 63342;
const server = app.listen(port, () => console.log('running on port ' + port));

app.get('/all', (req, res) => {
    res.send(projectData);
})


//set up a POST route. When a POST request is made to this URL, this code is run
app.post('/addData', (req, res) => {
    projectData['list'] = {
        list: req.body.list
    }; //add data to projectData - app endpoint
});
