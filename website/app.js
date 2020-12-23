const api_key = "72d5419403015e5d91da40f389f34892\n";
let city_name = 'London,uk'
const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${api_key}`;

const getRequest = async (url) => {
    const res = await fetch(url);
    try{
        const data = await res.json()
        return data;
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
    postRequest('/addData', {list:data.list});
})

//todo add received data to UI