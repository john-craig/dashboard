/* Message handling */

export async function recieveMessage(){
    return new Promise( function(resolve) {
        chrome.runtime.onMessage.addListener(function(response){
            resolve(response)
        })
    })
}

export async function sendMessage(target, body=undefined){
    const message = {
        origin: 'frontend',
        target: target,
        body: body
    }
    
    chrome.runtime.sendMessage(message);

    return recieveMessage()
}

/* Request particulars */

export async function testMessage(){
    return await sendMessage("driveFiles");
}