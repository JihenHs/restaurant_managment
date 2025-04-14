const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'jihen.hasnaoui1996@gmail.com',  
    pass: ''      
  }
});

module.exports = transporter;
