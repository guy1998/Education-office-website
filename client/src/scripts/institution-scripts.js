const url = "https://localhost:5443/institutions/"

export const getInstitutions = (proceeding)=>{
    fetch(url + "retrieve")
    .then(response=>{
        if(response.status === 200){
            return response.json();
        }else{
            alert('Server nuk punon!');
        }
    })
    .then(data=>{
        if(data)
            proceeding(data);
    })
    .catch(err=>{
        console.log(err);
        alert('Server nuk punon!');
    })
}