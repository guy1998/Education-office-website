const otp = require('otp-generator');
const bcrypt = require('bcrypt');

const otpGenerator = ()=>{
    return otp.generate(6);
}

const passwordHasher = async (password)=>{
    const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
    return hashedPassword;
}

module.exports = otpGenerator;