const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const TOKEN_PATH = path.join(__dirname, 'tokens.json');
const CREDENTIALS = {
  client_id: '265947533083-nnl5eq9fl9gno2rcjdl4k301pb7qeggl.apps.googleusercontent.com',
  client_secret: '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',
  redirect_uris: ['http://localhost:5000/oauth2callback']
};

async function sendEmail(to, subject, body) {
  try {
 
    const oAuth2Client = new google.auth.OAuth2(
      CREDENTIALS.client_id,
      CREDENTIALS.client_secret,
      CREDENTIALS.redirect_uris[0]
    );


    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });


    const rawMessage = [
      `From: "jihen hs" <jihen.hasnaoui1996@gmail.com>`,
      `To: ${to}`,
      `Subject: ${subject}`,
      '',
      body
    ].join('\n');

    const encodedMessage = Buffer.from(rawMessage)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log('Email envoyé ! ', res.data);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
  }
}

module.exports = sendEmail;
