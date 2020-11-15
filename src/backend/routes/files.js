const requestor = require('../utils/request.js')

// Methods

export function getFileByName(request, token){
    const type = "GET";
    const query = new URLSearchParams('q=p');
    query.set('q', "name = '" + request.argument + "'")

    const url = "https://www.googleapis.com/drive/v3/files?" + query.toString()

    return requestor.sendRequest(url, type, token, undefined)
}

export function getFileByID(request, token){
    const type = "GET"
    const query = new URLSearchParams("fields=*")
    const url = "https://www.googleapis.com/drive/v3/files/" + request.argument + '?' + query.toString()

    return requestor.sendRequest(url, type, token, undefined)
}

export function getFiles(request, token){
    const type = "GET";
    const url = "https://www.googleapis.com/drive/v3/files?" + buildQuery('name', 'contains', request.argument)

    return requestor.sendRequest(url, type, token, undefined)
}

export async function getTodaysLog(request, token){
    const date = new Date();
    request.argument = date;

    return await getItemByDate('log', request, token)
}

export async function getTodaysRecord(request, token){
    const date = new Date();
    request.argument = date;

    return await getItemByDate('rec', request, token)
}

export async function getTodaysBudget(request, token){
    const date = new Date();
    request.argument = date;

    return await getItemByDate('budg', request, token)
}

export async function getTodaysRegimen(request, token){
    const date = new Date();
    request.argument = date;

    return await getItemByDate('reg', request, token)
}

export async function getTodaysNutrition(request, token){
    const date = new Date();
    request.argument = date;

    return await getItemByDate('nut', request, token)
}

export async function getItemByDate(itemType, request, token){
    var date = request.argument;
    var month = date.getMonth() + 1;
    var day = date.getDate();

    const types = {
        'rec': "Record ",
        'log': "Log ",
        'budg': "Budget ",
        'reg': "Regimen ",
        'nut': "Nutrition "
    }

    if(itemType in types){
        itemType = types[itemType]
    }

    console.log("Getting a " + itemType)

    const type = "GET";
    var url = "https://www.googleapis.com/drive/v3/files?" + buildQuery('name', 'contains', itemType + month)

    //Start by getting all the files which match the number of the current month
    var monthItems = (await requestor.sendRequest(url, type, token, undefined)).files

    //Then filter the results based on whether the current day falls within the week range
    var weekItems = monthItems.filter(function(item){
        const name = item.name;

        return isWeekRange(name, day);
    })

    if(weekItems.length > 0){
        return await getFileByID({
            argument: weekItems[0].id
        }, token);
    } else {
        return undefined
    }
}

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