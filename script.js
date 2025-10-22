function sendRequest() {
    const request = new XMLHttpRequest();
    request.open("GET", `http://127.0.0.1:3000/${query}`, true);
    request.send();
    request.onload = function(){
        document.querySelector('#reqResponse').innerHTML = request.response;
    }
}