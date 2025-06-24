var URL_API = "https://rickandmortyapi.com/api/"
var API_CHARACTERS = URL_API + "character"
var API_LOCATION = URL_API + "location"
var API_EPISODE = URL_API + "episode"


var div_api = document.getElementsByClassName("api")

function fetch_api(destino, id = null){
    switch (destino) {
    case "CHARACTERs":
        console.log("El color es rojo");
        break;

    case "SINGLE_CHARACTER":
        if (id === null || id < 0){
            alert("ID de personaje inválido")
            break
        }
        var URL_SINGLE_CHARACTER = API_CHARACTERS + id
        break;

    case "EPISODE":
        console.log("El color es verde");
        break;

    default:
        console.log("Color no reconocido");
}
}
