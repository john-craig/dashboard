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

//Drive functions
export async function getFileByName(name){
    return await sendMessage('getFileByName', name)
}

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

//Document Section functions
 export async function getDocumentById(id){
     return await sendMessage('getDocumentById', id);
 }

 export async function getLogTasksById(id){
    return await sendMessage('getLogTasksById', id);
}

//Task functions
export async function getTaskLists(){
    return await sendMessage('getTaskLists');
}


export async function getTasks(){
    return await sendMessage('getTasks');
}