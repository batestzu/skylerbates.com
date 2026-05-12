// email test //
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
javascript
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// sgMail.setDataResidency('eu'); 
// uncomment the above line if you are sending mail using a regional EU subuser

const msg = {
  to: 'theskylerbates@gmail.com', // Change to your recipient
  from: 'skyler@skylerbates.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun DUDE (.y.)',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })