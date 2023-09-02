const cookie = require('js-cookie');

const writeCookie = (cookieInfo) => {
    console.log('Trying to set cookie');
    try {
        cookie.set(cookieInfo.name, JSON.stringify(cookieInfo.content), {
            expires: 1,
            secure: true,
            httpOnly: true,
            sameSite: 'None'
        });
    } catch (err) {
        console.log(err);
    }
}

const readCookie = (cookieName) => {
    console.log("Reading from cookie");
    return cookie.get(cookieName);
}

module.exports = {
    writeCookie: writeCookie,
    readCookie: readCookie
}