export function sendRequest(url, type, token, body=null){
    //https://www.googleapis.com/drive/v2/files

    let fetch_options = {
        method: type,
        headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        },
    };

    if(type === 'POST'){
        fetch_options['body'] = body;
    }

    const response = fetch(
        url,
        fetch_options
    ).then(
        function (response) {
            return response.json() // Transform the data into json
        }
    ).then(
        function (data) {
            return data;
        }
    );

    return response;
}