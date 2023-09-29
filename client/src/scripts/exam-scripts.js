const url = "https://localhost:5443/exams/"

export const getMatura = (proceeding)=>{
    fetch(url + "retrieve/matura")
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

export const getMiniMatura = (proceeding)=>{
    fetch(url + "retrieve/minimatura")
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