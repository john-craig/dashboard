const fileRoutes = require('./files.js')

export async function handleRoute(request, token){
    var response = undefined;

    const routes = {
        "getFile": fileRoutes.getFileByName,
        "getFiles": fileRoutes.getFiles,
        "getTodaysLog": fileRoutes.getTodaysLog,
        "getTodaysRecord": fileRoutes.getTodaysRecord,
        "getTodaysBudget": fileRoutes.getTodaysBudget,
    }

    if(request.target in routes){
        response = routes[request.target](request, token)
    }

    console.log("Sending a request.")

    return response;
}