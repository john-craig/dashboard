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