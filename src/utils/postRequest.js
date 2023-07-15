

export async function fetchPostRequest(url, requestBody){
    let data;
    let isPending;    
    let errorMsg = null;
    try{
     await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => {
            if(!response.ok){
                throw Error(response.message)
            }
            response.json();
        })
        .then(bodyData => {
            console.log("Response:", data);
            data = bodyData;
            isPending = false;
            errorMsg = null;
        })
    }catch(e){
        throw Error(e.message);
    }
    return {data, isPending, errorMsg}
}