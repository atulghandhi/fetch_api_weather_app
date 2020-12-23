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
const port = 3000;
const server = app.listen(port, () => console.log('running on fucking port ' + port));

app.get('/all', (req, res) => {
    res.send(projectData);
})


//set up a POST route. When a POST request is made to this URL, this code is run
app.post('/addData', (req, res) => {
    let newEntry = {
        list: req.body.list
    }
    projectData['list'] = newEntry; //add data to projectData - app endpoint
});
