async function postMessage(target, body, callback){
    const message = {
        target: target,
        body: body
    }
    
    chrome.runtime.sendMessage(message, function(response) {
        callback(response);
    });
}

async function getMessage(target, callback){
    const message = {
        target: target
    }
    
    chrome.runtime.sendMessage(message, function(response) {
        callback(response);
    });
}

export async function testMessage(callback){
    getMessage("driveFiles", callback)
}