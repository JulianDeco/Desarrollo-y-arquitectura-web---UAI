alert('AVISO\nNo todos los inputs son obligatorios de completar para hacer una búsqueda.\nSaludos!')

var URL_API = "https://rickandmortyapi.com/api/"
var API_CHARACTERS = URL_API + "character"
var API_LOCATION = URL_API + "location"
var API_EPISODE = URL_API + "episode"

var PAGES = 0
var API_NEXT = ""
var API_PREV = ""

var div_api = document.getElementsByClassName("api")

var BTN_SEARCH = document.getElementsByClassName("search")[0]
var BTN_CHARACTERS = document.getElementsByClassName("characters")[0]

BTN_SEARCH.addEventListener('click', api_manager_btn)
BTN_CHARACTERS.addEventListener('click', api_manager_btn)

function get_filters() {
  var filters = {};
  
  var name = document.getElementById('name').value.trim();
  if (name !== '') filters.name = name;
  
  var status = document.getElementById('status').value;
  if (status !== '') filters.status = status;
  
  var species = document.getElementById('species').value.trim();
  if (species !== '') filters.species = species;
  
  var type = document.getElementById('type').value.trim();
  if (type !== '') filters.type = type;
  
  var gender = document.getElementById('gender').value;
  if (gender !== '') filters.gender = gender;
  
  return filters;
}

function btn_search_manager(){
    var filters = get_filters()
    var API_CHARACTERS_FILTERS = API_CHARACTERS + '?'
    for (var key in filters) {
        if (filters.hasOwnProperty(key)) {
            API_CHARACTERS_FILTERS = API_CHARACTERS_FILTERS + key + '=' + filters[key] + '&'
        }
    }
    fetch_api(API_CHARACTERS_FILTERS)
}

function print_results(data){
    clean_results_page()
    var container = document.getElementsByClassName("results-fetch")[0]

    for (var i = 0; i < data.results.length; i++) {
        var personaje = data.results[i]

        var div_card = document.createElement("div")
        div_card.classList.add("card")

        var img = document.createElement("img")
        img.setAttribute("src", personaje.image)
        img.setAttribute("alt", personaje.name)
        div_card.appendChild(img)

        var h2 = document.createElement("h2")
        h2.textContent = personaje.name
        div_card.appendChild(h2)

        var p_status = document.createElement("p")
        p_status.textContent = "Estado: " + personaje.status
        div_card.appendChild(p_status)

        var p_species = document.createElement("p")
        p_species.textContent = "Especie: " + personaje.species
        div_card.appendChild(p_species)

        var p_type = document.createElement("p")
        p_type.textContent = "Tipo: " + personaje.type
        div_card.appendChild(p_type)

        var p_gender = document.createElement("p")
        p_gender.textContent = "Género: " + personaje.gender
        div_card.appendChild(p_gender)

        container.appendChild(div_card)
    }
}

function api_manager_btn(event){
    
    event.preventDefault()

    if (event.target === BTN_SEARCH) {
        console.log("Se apretó Buscar")
        btn_search_manager()
    } else if (event.target === BTN_CHARACTERS) {
        console.log("Se apretó Personajes")
        var api_results = fetch_api(API_CHARACTERS)
    } else if (event.target.tagName === "A") {
        var url = event.target.getAttribute("href")
        if (url !== null){
            fetch_api(url)
        }
        
    }
}
function clean_results_page(){
    var results_page = document.getElementsByClassName('results-fetch')[0]
    while (results_page.firstChild) {
        results_page.removeChild(results_page.firstChild);
    }
}

function api_pagination_btn(event){
}

function buttons_pagination_api(url_prev = null, url_next = null){
    var prev_button = document.getElementsByClassName("pagination-btn")[0]
    var next_button = document.getElementsByClassName("pagination-btn")[1]

    prev_button.setAttribute("href", url_prev)

    next_button.setAttribute("href", url_next)

    prev_button.addEventListener('click', api_manager_btn)
    next_button.addEventListener('click', api_manager_btn)
}

function fetch_api(url){
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la solicitud: " + response.status)
        }
        return response.json()
    })
    .then(data => {
        console.log("Datos recibidos:", data);
        buttons_pagination_api(data.info.prev, data.info.next)
        print_results(data)
        var print_pagination = document.getElementsByClassName('results-buttons')[0]
        print_pagination.style.display = 'flex'
    
    })
    .catch(error => {
        console.error("Error al obtener los datos:", error)
        alert("Ocurrió un error durante la obtención de datos:\n" + error)
    })
}

function functions_api(destino, id = null){
    switch (destino) {
    case "CHARACTERS":
        fetch_api(API_CHARACTERS)
        break

    case "SINGLE_CHARACTER":
        if (id === null || id < 0){
            alert("ID de personaje inválido")
            break
        }
        var URL_SINGLE_CHARACTER = API_CHARACTERS + id
        fetch_api(URL_SINGLE_CHARACTER)
        break

    case "EPISODE":
        console.log("El color es verde")
        fetch_api(API_EPISODE)
        break

    default:
        console.log("Opción no reconocida")
}
}