const requestor = require('./utils/request.js')

export async function handleRequest(request, token){
    var response = undefined;

    console.log(request.target)

    switch(request.target){
        case "getFile":
            response = getFileByName(request, token)
            break;
        case "getFiles":
            response = getFiles(request, token)
            break;
        case "getTodaysLog":
            response = await getTodaysLog(request, token)
            break;
        case "getLogByDate":
            response = await getLogByDate(request, token)
            break;
        case "getTodaysRecord":
            response = await getTodaysRecord(request, token)
            break;
        case "getRecordByDate":
            response = await getRecordByDate(request, token)
            break;
        case "getTodaysBudget":
            response = await getTodaysBudget(request, token)
            break;
        case "getBudgetByDate":
            response = await getBudgetByDate(request, token)
            break;
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
    const query = new URLSearchParams("fields=*")
    const url = "https://www.googleapis.com/drive/v3/files/" + request.argument + '?' + query.toString()

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

async function getTodaysRecord(request, token){
    const date = new Date();
    request.argument = date;

    return await getRecordByDate(request, token)
}

async function getTodaysBudget(request, token){
    const date = new Date();
    request.argument = date;

    return await getBudgetByDate(request, token)
}

async function getLogByDate(request, token){
    var date = request.argument;
    var month = date.getMonth() + 1;
    var day = date.getDate();

    console.log("Getting a log.")

    const type = "GET";
    var url = "https://www.googleapis.com/drive/v3/files?" + buildQuery('name', 'contains', "Log " + month)

    //Start by getting all the files which match the number of the current month
    var monthLogs = (await requestor.sendRequest(url, type, token, undefined)).files

    //Then filter the results based on whether the current day falls within the week range
    var weekLogs = monthLogs.filter(function(item){
        const name = item.name;

        return isWeekRange(name, day);
    })

    if(weekLogs.length > 0){
        return await getFileByID({
            argument: weekLogs[0].id
        }, token);
    } else {
        return undefined
    }
}

async function getRecordByDate(request, token){
    var date = request.argument;
    var month = date.getMonth() + 1;
    var day = date.getDate();

    console.log("Getting a record.")

    const type = "GET";
    var url = "https://www.googleapis.com/drive/v3/files?" + buildQuery('name', 'contains', "Record " + month)

    //Start by getting all the files which match the number of the current month
    var monthRecords = (await requestor.sendRequest(url, type, token, undefined)).files

    //Then filter the results based on whether the current day falls within the week range
    var weekRecords = monthRecords.filter(function(item){
        const name = item.name;

        return isWeekRange(name, day);
    })

    if(weekRecords.length > 0){
        return await getFileByID({
            argument: weekRecords[0].id
        }, token);
    } else {
        return undefined
    }
}

async function getBudgetByDate(request, token){
    var date = request.argument;
    var month = date.getMonth() + 1;
    var day = date.getDate();

    console.log("Getting a budget.")

    const type = "GET";
    var url = "https://www.googleapis.com/drive/v3/files?" + buildQuery('name', 'contains', "Budget " + month)

    //Start by getting all the files which match the number of the current month
    var monthBudgets = (await requestor.sendRequest(url, type, token, undefined)).files

    //Then filter the results based on whether the current day falls within the week range
    var weekBudgets = monthBudgets.filter(function(item){
        const name = item.name;

        return isWeekRange(name, day);
    })

    if(weekBudgets.length > 0){
        return await getFileByID({
            argument: weekBudgets[0].id
        }, token);
    } else {
        return undefined
    }
}


// Utility functions

function isWeekRange(name, day){
    var isRange = false;
    var slashPosition = name.indexOf('/');
    var blankPosition = name.indexOf(' ', slashPosition)

    const firstNum = parseInt(name.substring(slashPosition+1, blankPosition)) - 1

    slashPosition = name.indexOf('/', blankPosition)

    const secondNum = parseInt(name.substring(slashPosition+1)) + 1

    if(firstNum < secondNum){
        isRange = firstNum <= day && day <= secondNum
    } else {
        isRange = firstNum <= day || day <= secondNum
    }

    return isRange;
}

function buildQuery(term, operator, value){
    const query = new URLSearchParams('q=p')

    query.set('q', term + " " + operator + " '" + value + "'")

    return query.toString()
}