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

BTN_SEARCH.addEventListener('click', api_manager_btn);
BTN_CHARACTERS.addEventListener('click', api_manager_btn);

function api_manager_btn(event){
    
    if (event.target === BTN_SEARCH) {
        console.log("Se apretó Buscar");
    } else if (event.target === BTN_CHARACTERS) {
        console.log("Se apretó Personajes");
    }
}
function clean_results_page(){
    var results_page = document.getElementsByClassName('results-fetch')[0]
    while (results_page.firstChild) {
        results_page.removeChild(results_page.firstChild);
    }
}

function buttons_pagination_api(url_prev = null, url_next = null){
    var prev_button = document.getElementsByClassName("pagination-btn")[0]
    var next_button = document.getElementsByClassName("pagination-btn")[1]

    prev_button.setAttribute("href", url_prev);
    prev_button.setAttribute("target", "_blank");

    next_button.setAttribute("href", url_next);
    next_button.setAttribute("target", "_blank");

}

function fetch_api(url){
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la solicitud: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log("Datos recibidos:", data);
        buttons_pagination_api(data.info.prev, data.info.next)
    })
    .catch(error => {
        console.error("Error al obtener los datos:", error)
        alert("Ocurrió un error durante la obtención de datos:\n" + error)
    })
}

function functions_api(destino, id = null){
    switch (destino) {
    case "CHARACTERS":
        console.log("El color es rojo");
        fetch_api(API_CHARACTERS)
        break;

    case "SINGLE_CHARACTER":
        if (id === null || id < 0){
            alert("ID de personaje inválido")
            break
        }
        var URL_SINGLE_CHARACTER = API_CHARACTERS + id
        fetch_api(URL_SINGLE_CHARACTER)
        break;

    case "EPISODE":
        console.log("El color es verde");
        fetch_api(API_EPISODE)
        break;

    default:
        console.log("Opción no reconocida");
}
}