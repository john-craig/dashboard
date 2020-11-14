const requestor = require('./request.js')

export async function handleRequest(request, token){
    var response = undefined;

    switch(request.target){
        case "getFile":
            response = getFile(request, token)
    }

    console.log("Sending a request.")

    return response;
}

function getFile(request, token){
    const type = "GET";
    const query = new URLSearchParams('q=p');
    query.set('q', "name = '" + request.argument + "'")

    const url = "https://www.googleapis.com/drive/v3/files?" + query.toString()

    return requestor.sendRequest(url, type, token, undefined)
}