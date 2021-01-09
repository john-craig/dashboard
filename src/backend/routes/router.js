const fileRoutes = require('./files.js')
const docRoutes = require('./documents.js');
const taskRoutes = require('./tasks.js');

export async function handleRoute(request, token){
    var response = undefined;

    console.log("Handling a route.")

    const routes = {
        "getFile": fileRoutes.getFileByName,
        "getFiles": fileRoutes.getFiles,
        "getTodaysLog": fileRoutes.getTodaysLog,
        "getTodaysRecord": fileRoutes.getTodaysRecord,
        "getTodaysBudget": fileRoutes.getTodaysBudget,
        "getTodaysRegimen": fileRoutes.getTodaysRegimen,
        "getTodaysNutrition": fileRoutes.getTodaysNutrition,

        "getDocumentById": docRoutes.getDocumentByID,
        "getLogTasksById": docRoutes.getLogTasksByID,

        "getTasks": taskRoutes.getTasks,
        "getTaskLists": taskRoutes.getTaskLists
    }

    if(request.target in routes){
        response = routes[request.target](request, token)
    }

    return response;
}