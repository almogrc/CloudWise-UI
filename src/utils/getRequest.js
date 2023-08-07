export async function fetchGetRequest(url, header =  {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }){
    let data;
    let isPending;    
    let errorMsg = null;
    try{
     await fetch(url, {
        credentials: 'include',
        headers: header
      })
        .then(response => {
            if(!response.ok){
                throw Error(response.message)
            }
            return response.json();
        })
        .then(bodyData => {
            data = bodyData;
            console.log("Response:", data);
            isPending = false;
            errorMsg = null;

        })
    }catch(e){
        throw Error(e.message);
    }
    return {data, isPending, errorMsg}
}