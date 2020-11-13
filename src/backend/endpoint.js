const requestor = require('./request.js')

export async function handleRequest(request, token){
    const parameters = determineParameters(request)

    console.log("Sending a request.")
    console.log(parameters['url'])
    return requestor.sendRequest(parameters['url'], parameters['type'], token, parameters['body'])
}

function determineParameters(request){
    var parameters = {
        'type': undefined,
        'url': undefined,
        'body': undefined
    }

    const queryURL = new URLSearchParams('q=p');

    switch(request.target){
        case "driveFiles":
            parameters.type = "GET";
            parameters.url = "https://www.googleapis.com/drive/v2/files"
            break;

        //Get all the files of a root directory
        case "getFile":
            queryURL.set('q', "name='" + request.argument + "'");
            console.log(queryURL.toString())

            //?q=name+%3d+%27" + request.argument + "%27"

            parameters.type = "GET";
            parameters.url = "https://www.googleapis.com/drive/v3/files?" + queryURL.toString()
    }

    return parameters
}