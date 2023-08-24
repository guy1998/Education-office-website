const otp = require('otp-generator');
const bcrypt = require('bcrypt');

const otpGenerator = () => {
    return otp.generate(6);
}

const passwordHasher = (password) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return hashedPassword;
}

const passwordVerifier = (realPassword, testedPassword) => {
    return bcrypt.compareSync(realPassword, testedPassword);
}

module.exports = {
    otpGenerator: otpGenerator,
    passwordHasher: passwordHasher,
    passwordVerifier: passwordVerifier
};