function addData(){
    const request = new XMLHttpRequest();
    const params = new URLSearchParams({label: document.querySelector('#labelInput').value, description: document.querySelector('#valueInput').value});
    let section = document.querySelector("#resumeSection").value
    let data = document.querySelector("#userInput");
    request.open("POST",`http://127.0.0.1:3000/add${section}?${params}`,true);
    request.send();
    request.onload = function(){
        document.querySelector('#resumeDisplay').innerHTML = request.response;
    }
}
function deleteData(){
    const request = new XMLHttpRequest();
    let section = document.querySelector("#resumeSection").value
    let data = document.querySelector("#userInput");
    request.open("DELETE",`http://127.0.0.1:3000/delete${section}/${data}`,true);
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