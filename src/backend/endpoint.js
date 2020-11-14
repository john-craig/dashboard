const requestor = require('./request.js')

export async function handleRequest(request, token){
    var response = undefined;

    switch(request.target){
        case "getFile":
            response = getFileByName(request, token)
        case "getFiles":
            response = getFiles(request, token)
        case "getTodaysLog":
            response = await getTodaysLog(request, token)
        case "getLogByDate":
            response = await getLogByDate(request, token)
    }

    console.log("Sending a request.")

    return response;
}


// Methods

function getFileByName(request, token){
    const type = "GET";
    const query = new URLSearchParams('q=p');
    query.set('q', "name = '" + request.argument + "'")

    const url = "https://www.googleapis.com/drive/v3/files?" + query.toString()

    return requestor.sendRequest(url, type, token, undefined)
}

function getFileByID(request, token){
    const type = "GET"
    const url = "https://www.googleapis.com/drive/v3/files/" + request.argument

    return requestor.sendRequest(url, type, token, undefined)
}

function getFiles(request, token){
    const type = "GET";
    const url = "https://www.googleapis.com/drive/v3/files?" + buildQuery('name', 'contains', request.argument)

    return requestor.sendRequest(url, type, token, undefined)
}

async function getTodaysLog(request, token){
    const date = new Date();
    request.argument = date;

    return await getLogByDate(request, token)
}

async function getLogByDate(request, token){
    var date = request.argument;
    var month = date.getMonth() + 1;
    var day = date.getDate();

    const type = "GET";
    var url = "https://www.googleapis.com/drive/v3/files?" + buildQuery('name', 'contains', "Log " + month)

    //Start by getting all the files which match the number of the current month
    var monthLogs = (await requestor.sendRequest(url, type, token, undefined)).files

    //Then filter the results based on whether the current day falls within the week range
    var weekLogs = monthLogs.filter(function(item){
        const name = item.name;

        var slashPosition = name.indexOf('/');
        var blankPosition = name.indexOf(' ', slashPosition)

        const firstNum = parseInt(name.substring(slashPosition+1, blankPosition)) - 1

        slashPosition = name.indexOf('/', blankPosition)

        const secondNum = parseInt(name.substring(slashPosition+1)) + 1

        if(firstNum < secondNum){
            return firstNum <= day && day <= secondNum
        } else {
            return firstNum <= day || day <= secondNum
        }
    })

    return weekLogs
}

function buildQuery(term, operator, value){
    const query = new URLSearchParams('q=p')

    query.set('q', term + " " + operator + " '" + value + "'")

    return query.toString()
}