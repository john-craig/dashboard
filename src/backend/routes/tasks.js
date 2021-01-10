const r = require('../utils/request.js')
const q = require('../utils/query.js')

// Methods

export async function getTasks(request, token){
    const type = "GET";
    const taskLists = (await getTaskLists(undefined, token));
    var taskListId = taskLists.items[0].id

    const url = "https://tasks.googleapis.com/tasks/v1/lists/" + taskListId + "/tasks"

    return r.sendRequest(url, type, token, undefined)
}

export function getTaskLists(request, token){
    const type = "GET";

    const url = "https://tasks.googleapis.com/tasks/v1/users/@me/lists"

    return r.sendRequest(url, type, token, undefined)
}