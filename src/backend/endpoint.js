const requestor = require('./request.js')

export async function handleRequest(request, token){
    const parameters = determineParameters(request)

    console.log("Sending a request.")
    return requestor.sendRequest(parameters['url'], parameters['type'], token, request.body)
}

function determineParameters(request){
    var parameters = {
        'type': undefined,
        'url': undefined
    }

    switch(request){
        case "driveFiles":
            parameters.type = "GET";
            parameters.url = "https://www.googleapis.com/drive/v2/files"
            break;

        //Get all the files of a root directory
        case "driveRoot":
            parameters.type = "GET";
            parameters.url = "https://www.googleapis.com/drive/v2/files/root/children"
    }

    return parameters
}