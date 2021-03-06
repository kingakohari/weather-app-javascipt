

const loadEvent = _ => {

    const weatherCard = () => {
        return `
        <form autocomplete="off" action="/action_page.php">
            <div class="autocomplete">
                <input id="myInput" type="text" placeholder="Search for a fucking city!">            
            </div>
            <button type="submit" id="weather_data">FUCKING SHOW IT TO ME!</button>
        </form>
        `
    }
            

    const rootElement = document.getElementById("root");
    
    rootElement.insertAdjacentHTML("beforeend", weatherCard());

    rootElement.insertAdjacentHTML("beforeend",`
    <div id="display_data">
    </div>
    `)
   
    const weatherData = document.querySelector("button");
        weatherData.addEventListener("click", function(e){
        e.preventDefault();
    
        const cityName = document.getElementById("myInput").value
            
        const apiKey = "e01bfa1663fc2ce72f2053d5c221e70b"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        
            if(cityName == ""){
                alert("Enter a city name");
            } else {

            fetch(url).then(function(response){
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error(Error);
                }
            }).then(function(data){

                let {main, sys, name, weather, wind} = data
                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
                
                let roundedTemp = Math.round(main.temp * 10) / 10


                const card =`
                <div class="results">
                    <h2>${name}</h2>
                    <p>${roundedTemp} °C</p>
                    <p>Country: ${sys.country}</p> 
                    <p>Humidity: ${main.humidity} %</p>
                    <p>Wind speed: ${wind.speed} km/h</p>
                    <img class="icon" src="${icon}">
                </div>
                `

                document.getElementById("display_data").innerHTML = card;
            }).catch(function(error){
                console.log(error);
            });
            }
});
function autocomplete(inp, arr) {

    var currentFocus;

    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        
        a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the div element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        
        for (i = 0; i < arr.length; i++) {
          
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            
            b = document.createElement("div");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert an input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
           
                b.addEventListener("click", function(e) {
                
                inp.value = this.getElementsByTagName("input")[0].value;

                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {

          currentFocus++;
          addActive(x);

        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);

        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
     
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }
 
autocomplete(document.getElementById("myInput"), cities);


} 
window.addEventListener("load", loadEvent);