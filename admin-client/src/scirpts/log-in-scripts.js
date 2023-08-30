const cookies = require('./cookie-handler.js');

const verifyOtp = (temp_id, otp, navigator)=>{

    fetch('http://localhost:5000/authenticate/otp', {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({temp_id: temp_id, otp: otp})
    })
    .then(response=>{
        if(response.status === 200){
            return response.json();
        }else if (response.status === 404){
            alert('Otp has expired');
            window.location.reload();
        }else if(response.status === 401){
            const msg = document.getElementById('errorMessage');
            msg.innerHTML = 'OTP is not correct!';
        }
    })
    .then(data=>{
        cookies.writeCookie(data);
        //navigator('/home', {replace: true});
    })

}

const login = (username, password, otpchecker) => {

    fetch('http://localhost:5000/authenticate/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(response => {
        if (response.status === 200)
            return response.json();
        else if (response.status === 404)
            alert('User does not exist');
        else
            alert('Wrong password');
    }).then(serverData=>{
        if(serverData){
            localStorage.setItem('temporary_id', serverData.temp_id);
            otpchecker();
        }
    })

}

module.exports = {
    verifyOtp: verifyOtp,
    login: login
};