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
    
    console.log(message)

    chrome.runtime.sendMessage(message);

    return recieveMessage()
}

/* Request particulars */

export async function testMessage(){
    return await sendMessage("getFile", "November");
}