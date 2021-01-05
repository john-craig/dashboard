export function getBodySections(body){
    var sections = [
        []
    ]
    var secIdx = 0;

    for(var i=0;i<body.content.length;i++){
        var string = ""

        if(body.content[i]['paragraph']){
            var paragraph = body.content[i]['paragraph']

            for(var j=0;j<paragraph.elements.length;j++){
                var textContent = paragraph.elements[j]['textRun'] ? paragraph.elements[j]['textRun']['content'] : ""

                string = string + textContent
            }
        }

        //If the resulting string is only a newline, this is the end of the section
        if(string == "↵" || string == "\n"){
            sections.push([])
            secIdx++
        } else {
            string = string.substring(0, string.length - 1)
            sections[secIdx].push(string)
        }
    }

    return sections
}

//For updating/writing Documents
/*
    Overall
        -the documentId and revisionId will both need to be obtained

    POST https://docs.googleapis.com/v1/documents/{documentId}:batchUpdate

    Update object: 
    {
        "requests": [
            One or more Request object(s), see below
        ],
        "writeControl": {
            "targetRevisionId": revisionId
        }
    }
*/
/*
    Inserting New Text
        -if inserted at a position that had a bullet point, will be contained by that bullet point

    Request object:
    
    "insertText" : {
        "text": string,
        "location": {
            {
                "index": integer
            }
        }
    }


    See more: https://developers.google.com/docs/api/reference/rest/v1/documents/request#InsertTextRequest
*/
/*
    Deleting Content

    Request object:
    "deleteContentRange": {
        "range": {
            "startIndex": integer,
            "endIndex": integer
        }
    }

    See More: https://developers.google.com/docs/api/reference/rest/v1/documents/request#DeleteContentRangeRequest 
*/
/*
    Creating a Paragraph Bullet

    See more: https://developers.google.com/docs/api/reference/rest/v1/documents/request#CreateParagraphBulletsRequest
    Also:     https://developers.google.com/docs/api/reference/rest/v1/documents/request#BulletGlyphPreset 
*/
/*
    Update Paragraph Style

    See more: https://developers.google.com/docs/api/reference/rest/v1/documents/request#UpdateParagraphStyleRequest 
    Also:     https://developers.google.com/docs/api/reference/rest/v1/documents#ParagraphStyle 
*/
/*
    For use later: '✓'
*/