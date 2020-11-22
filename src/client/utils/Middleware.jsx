/* Message handling */

export async function recieveMessage(){
    return new Promise( function(resolve) {
        chrome.runtime.onMessage.addListener(function(response){
            resolve(response)
        })
    })
}

export async function sendMessage(target, argument=undefined, body=undefined){
    const message = {
        origin: 'frontend',
        target: target,
        argument: argument,
        body: body
    }

    chrome.runtime.sendMessage(message);

    return recieveMessage();
}

/* Request particulars */

export async function getCurrentLog(){
    return await sendMessage('getTodaysLog');
}

export async function getCurrentRecord(){
    return await sendMessage('getTodaysRecord');
}

export async function getCurrentBudget(){
    return await sendMessage('getTodaysBudget');
}

export async function getCurrentRegimen(){
    return await sendMessage('getTodaysRegimen');
}

export async function getCurrentNutrition(){
    return await sendMessage('getTodaysNutrition');
}

//
 export async function getDocumentById(id){
     return await sendMessage('getDocumentById', id);
 }

 export async function getLogTasksById(id){
    return await sendMessage('getLogTasksById', id);
}