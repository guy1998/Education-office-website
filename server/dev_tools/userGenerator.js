const email = require('../utilities/email.js');
const { passwordStrength } = require('check-password-strength');
const passwordGen = require('generate-password');
const security = require('../utilities/security-ground.js');

const generateRandomUsername = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const usernameLength = 6;
  let username = '';

  for (let i = 0; i < usernameLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    username += characters[randomIndex];
  }

  const randomIndex = Math.floor(Math.random() * usernameLength);
  username = username.substring(0, randomIndex) + '-' + username.substring(randomIndex + 1);

  username = username.replace(/^-|-$/g, '');

  return username;
}

const generateRandomPassword = () => {

  let newPassword = passwordGen.generate({
    length: 8,
    numbers: true,
    symbols: true,
    exclude: ".,''{}()@"
  })
  while (passwordStrength(newPassword).value !== "Strong") {
    newPassword = passwordGen.generate({
      length: 12,
      numbers: true,
      symbols: true,
      exclude: ".,''{}()@"
    })
  }

  return newPassword;
}

const generateRandomUser = (db) => {
  const newUsername = generateRandomUsername();
  const newPassword = generateRandomPassword();
  let hashedPassword = security.passwordHasher(newPassword);

  email.sendUserInfo("acifliku21@epoka.edu.al", newUsername, newPassword);

  db.collection("user").insertOne({
    "name": "random user",
    "username": newUsername,
    "password": hashedPassword,
    "email": "acifliku21@epoka.edu.al"
  })
}

module.exports = generateRandomUser;