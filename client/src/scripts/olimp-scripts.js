const url = "https://localhost:5443/exams/"

export const getOlimp = (proceeding)=>{
    fetch(url + "retrieve/olimpiada")
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