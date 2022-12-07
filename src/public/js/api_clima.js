const clima_view = document.getElementById('clima');

const apiKey = 'ef8153f381d4c88bebc3c2830e52b3e3'
const api = 'https://api.openweathermap.org/data/2.5/weather?q=Tandil,ar'


 async function mostrarClima(){
   const climaApi = fetch(`${api}&APPID=${apiKey}`)

      .then(resolve => resolve.json())
      .then(climaApi => clima_view.innerHTML = `<h4>${climaApi.name}<br>Temp actual ${Math.round(climaApi.main.temp-273)}° </h4>`)
      .catch(err => console.log(err));
      
   

    
     console.log(climaApi);
    
}

 document.addEventListener('DOMContentLoaded', mostrarClima);