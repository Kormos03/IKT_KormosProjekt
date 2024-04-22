// Purpose: Contains the RequestFunc function, which is used to make requests to the server.
// The function takes in the method, route, token, and body as parameters and returns the data from the server response.
// The function also handles errors and unauthorized requests.
// The RequestFunc function is used in the AdminLoginPage and AdminPage components to make requests to the server.
//It needs to be imported into the AdminLoginPage component to be used.
//It needs to make more requests to the server.


export async function RequestFunc(method, route, token?, body){
    if(token){
        const response = await fetch(route, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
    
        })
    }
    const response = await fetch(route, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },


    })
   
    if(response.status === 200){
        const {data} = await response.json();
        return data;
    }
    else if(response.status === 401){
        throw new Error('Unauthorized');
    }
    else{
        throw new Error('An error occurred, try again later');
    }
    

}