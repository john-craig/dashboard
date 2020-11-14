export async function sendRequest(url, type, token, body){
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

    console.log("Sending a request.")

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

    console.log("Returning a request.")

    return response;
}