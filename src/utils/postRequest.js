
export async function fetchPostRequest(url, requestBody, header = {"Content-Type": "application/json"}){
    let data;
    let isPending;    
    let errorMsg = null;
    try{
     await fetch(url, {
        method: "POST",
        credentials: 'include',
        headers: header,
        body: JSON.stringify(requestBody)
      })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                  // Throw an error with the message from the response JSON
                  console.log("Response:", errorData);
                  throw new Error(errorData.error);
                });
              }
            return response.json();
        })
        .then(bodyData => {
            console.log("Response:", data);
            data = bodyData;
            isPending = false;
            errorMsg = null;
        })
    }catch(e){
        console.log(e.message);
        throw e;
    }
    return {data, isPending, errorMsg}
}