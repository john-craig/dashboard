const r = require('../utils/request.js')
const q = require('../utils/query.js')


export function getDocumentByID(request, token){
    const type = "GET"
    const url = "https://docs.googleapis.com/v1/documents/" + request.argument

    return r.sendRequest(url, type, token, undefined)
}

export async function getLogTasksByID(request, token){
    const document = (await getDocumentByID(request, token))

    var results = [];
    var content = document.body.content;
    var curParagraph;

    var i = 0;
    var j = 0;
    var k = 0;

    while(i < content.length){
        curParagraph = content[i].paragraph;

        if(curParagraph){
            results.push(
                curParagraph.elements.reduce(
                    function(reducer, element){
                        if(element.textRun){
                            if(element.textRun.content != "↵"){
                                reducer = reducer + element.textRun.content
                            }
                        }

                        return reducer
                    },
                    ""
                )
            )
        }

        i++;
    }

    var headers = [
        "Month", "Week", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
    ]

    var types = [
        "Deeds", "Tasks"
    ]

    //TODO
    /*
        Need a good way of both extracting information from a doc object in a usable format
        as well as modifying a doc object using that format as necessary
    */

    i = 0;
    var curHeader = headers[0];

    while(i < results.length){
        if(results[i].contains(headers[j])){

        }

        i++;
    }


    return {body: result};
}