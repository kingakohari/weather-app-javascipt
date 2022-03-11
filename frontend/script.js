function World(city, temperature, condition, humidity, uv, windspeed, winddir){
    this.city = city;
    this.temperature = temperature;
    this.condition = condition;
    this.humidity = humidity;
    this.uv = uv;
    this.windspeed = windspeed;
    this.winddir = winddir;
} 


let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

// Input mező, DIVcard - tartalmazza a cuccokat (img, város, hőmérséklet, condition, humidity, UV, wind_kph, wind_dir)

const weatherCard = (city, temperature, condition, humidity, uv, windspeed, winddir) => {
    return `
    <form>
        <label type="search">Select city</label>	  
        <input id="input" placeholder="Start typing city name" name="input"/></input>
        <button>Submit</button> 
    </form>

    <div class="card">
        <img src="${condition}">
        <h2 class="city"></h2>
        <h3 class="temperature">"${temperature}"</h3>
        <p class="condition">"${condition}"</p>
        <p class="humidity">"${humidity}"</p>
        <p class="uv">"${uv}"</p>
        <p class="windspeed">"${windspeed}"</p>
        <p class="winddir">"${winddir}"</p>
    </div>
    `
}


const loadEvent = async _ => {
    // html construct
    const rootElement = document.getElementById("root");
    
    const apiKey = "a392157e968f4ab9bad132923220703"
    const requestedDate = today
    /* const city = document.querySelector("input") */
    const city = "Budapest" 


    const worldRes = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
    const getWorld = await worldRes.json();

    console.log(getWorld)
     
   /*  let weatherStats = Object.values(getWorld).map(function(wth){
        return new World(wth.name, wth.temp_c, wth.icon, wth.humidity, wth.uv, wth.wind_kph, wth.wind_dir)
        })

    
    
    let content = ""
    for (const weatherStat of weatherStats) {
        content = weatherCard(weatherStat.city, weatherStat.temperature, weatherStat.condition, weatherStat.humidity, weatherStat.uv, weatherStat.windspeed, weatherStat.winddir)

    }
    

    document.getElementById("root").insertAdjacentHTML("beforeend", content)

    document.querySelector("button").addEventListener("submit", function(event) {
        
        document.querySelector(".city").innerHTML = `${city}`
    }); */
 

        const getWeather = fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`).then(
        function(response){
            response.json().then(
                function (responseJson) {
                    console.log(responseJson.location)
                    console.log(responseJson.current)
                 }
                )
            }) 
       
   /*  let weatherStat = getWeather.map(function(wth){
        return new World(wth.location.name, wth.current.temp_c, wth.current.condition.icon, wth.current.humidity, wth.current.uv, wth.current.wind_kph, wth.current.wind_dir)
        })
         
    console.log(content)*/


}
window.addEventListener("load", loadEvent);
