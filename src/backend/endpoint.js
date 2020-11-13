const requestor = require('./request.js')

export async function handleRequest(request, token){
    const parameters = determineParameters(request.target)

    console.log("Sending a request.")
    return await requestor.sendRequest(parameters['url'], parameters['type'], token, request.body)
}

function determineParameters(target){
    var parameters = {
        'type': undefined,
        'url': undefined
    }

    switch(target){
        case "driveFiles":
            parameters.type = "GET";
            parameters.url = "https://www.googleapis.com/drive/v2/files"
            break;
    }

    return parameters
}