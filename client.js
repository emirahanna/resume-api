function sendRequest() {
    const request = new XMLHttpRequest();
    request.open("GET", `http://127.0.0.1:3000/${query}`, true);
    request.send();
    request.onload = function(){
        document.querySelector('#reqResponse').innerHTML = request.response;
    }
}
function addData(){
    const request = new XMLHttpRequest();
    let section = document.querySelector("#resumeSection")
    let data = document.querySelector("#userInput");
    //is this the best way to send data? can it be query param instead
    request.open("POST",`http://127.0.0.1:3000/add${section}/${data}`,true);
    request.send();
}
function deleteData(){
    const request = new XMLHttpRequest();
    let section = document.querySelector("#resumeSection")
    let data = document.querySelector("#labelInput");
    request.open("DELETE",`http://127.0.0.1:3000/delete/${section}/${data}`,true);
    request.send();
}
function readData(){
    const request = new XMLHttpRequest();
    let section = document.querySelector("#resumeSection").value;
    request.open("GET",`http://127.0.0.1:3000/get${section}`,true);
    request.send();
    request.onload = function(){
        document.querySelector('#resumeDisplay').innerHTML = request.response;
    }
    console.log(request.responseText)
}
function viewResume(){
    const request = new XMLHttpRequest();
    request.open("GET",`http://127.0.0.1:3000/viewResume`,true);
    request.send();
}