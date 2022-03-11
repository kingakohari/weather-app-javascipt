
/* const weatherCard = () => {
    return `
    <form>
        <input type="text" placeholder="Search for a fucking city!" autofocus>
        <button type="submit">FUCKING SHOW IT TO ME!</button>
    </form>
    `
} */

const loadEvent = async _ => {
    // html construct
    const rootElement = document.getElementById("root");
    const input = document.querySelector("input");
    const inputVal = input.value

    //document.getElementById("root").insertAdjacentHTML("beforeend", weatherCard()) 
    
    
    const apiKey = "e01bfa1663fc2ce72f2053d5c221e70b"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let {main, sys, name, weather, wind} = data
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
            
            let roundedTemp = Math.round(main.temp * 10) / 10

            const card =`
            <input id="input" placeholder="Start typing city name" name="input"/></input>
            <div class="card">
                <p class="name">${name}</p>
                <p>${roundedTemp}<sup>°C</sup></p>
                <p>${sys.country}</p>
                <p>${main.humidity}</p>
                <p>${wind.speed}</p>
                <img class="icon" src="${icon}">
            </div>
            `
            document.getElementById("root").insertAdjacentHTML("beforeend", card)
        })
    
        /* form.addEventListener("submit", e => {
            e.preventDefault();
            const inputVal = input.value;
        });
            */
        
    } 
window.addEventListener("load", loadEvent);