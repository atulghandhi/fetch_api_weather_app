const api_key = "72d5419403015e5d91da40f389f34892\n";
let city_name = 'London,uk'
const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${api_key}`;
const cardsContainer = document.getElementById('cards-container');

const getRequest = async (url) => {
    const res = await fetch(url);
    try{
        return await res.json();
    } catch (e) {
        console.log('error in get: ' +  e)
    }
}

const postRequest = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {   //fetch the url you're making the POST request to
        method: 'POST',     //specify type of request, can be POST/GET/DELETE
        credentials: 'same-origin',     //boilerplate
        headers: {
            'Content-Type': 'application/json',     //data type app runs on:json
        },
        body: JSON.stringify(data),     //body data type must match "Content-Type" header (stringify converts sting to json)
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error in post:", error);
    }
}

getRequest(url).then( function (data) {
    postRequest('/addData', {list:data.list}); //Post request in this example app doesn't achieve anything. This is just to prove that I can!

    addDataToUI(data.list);
})

//todo add received data to UI

function addDataToUI(allWeatherData){
    console.log(allWeatherData);
    const current = new Date().getHours();
    if(current>21){
        //do-nothing
    }else if(current>18){
        createWeatherBox(allWeatherData.splice(0, 1));
    }else if(current>15){
        createWeatherBox(allWeatherData.splice(0, 2));
    }else if(current>12){
        createWeatherBox(allWeatherData.splice(0, 3));
    }else if(current>9){
        createWeatherBox(allWeatherData.splice(0, 4));
    }else if(current>6){
        createWeatherBox(allWeatherData.splice(0, 5));
    }else if(current>3){
        createWeatherBox(allWeatherData.splice(0, 6));
    }else if(current>0){
        createWeatherBox(allWeatherData.splice(0, 7));
    }

    createWeatherBox(allWeatherData.slice(0, 7));
    createWeatherBox(allWeatherData.slice(8, 15));
    createWeatherBox(allWeatherData.slice(16, 23));
    createWeatherBox(allWeatherData.slice(24, 31));
    createWeatherBox(allWeatherData.slice(32, 39));
}

function createWeatherBox(dayWeatherData){
    const cardDiv = createElement('div', 'card'); //create card

    const day = createElement('div', 'sec sec1'); //create element to hold date
    day.textContent = getDayName(new Date(dayWeatherData[0].dt * 1000).getDay());
    cardDiv.appendChild(day)

    for(let i = 0; i<dayWeatherData.length; i++) {

        const tempElement = createElement('div', `sec sec${i+2}`); //create element to hold date
        tempElement.textContent = `${dayWeatherData[i].dt_txt.slice(11, 16)}
                                   ${(dayWeatherData[i].main.temp - 273.15).toFixed(1)}°C`;

        cardDiv.appendChild(tempElement)
    }

    cardsContainer.appendChild(cardDiv);
}

function createElement(type, className){
    const newElement = document.createElement(type);
    newElement.className = className;
    return newElement;
}

function getDayName(day){
    return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][day];
}