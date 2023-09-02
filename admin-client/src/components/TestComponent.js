import React, { useEffect } from "react";

function TestComponent(){

    useEffect(()=>{
        fetch('https://localhost:5443/announcements/admin/retrieve', {
            method: "GET",
            credentials: 'include',
            mode: 'cors'
        }).then(response=>{
            return response.json();
        }).then(data=>{
            document.getElementById('testElement').innerHTML = data;
        })
    }, []);

    return (<h1 id='testElement'>This was a test sir!</h1>)
}

export default TestComponent;