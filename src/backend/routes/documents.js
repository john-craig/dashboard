const r = require('../utils/request.js')
const q = require('../utils/query.js')
const doc = require('../utils/google/documents')

export function getDocumentByID(request, token){
    const type = "GET"
    const url = "https://docs.googleapis.com/v1/documents/" + request.argument

    return r.sendRequest(url, type, token, undefined)
}

export async function getLogTasksByID(request, token){
    console.log("FAS")
    const document = (await getDocumentByID(request, token))

    var sections = doc.getBodySections(document.body)

    return sections
}