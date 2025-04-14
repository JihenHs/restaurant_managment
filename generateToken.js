const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');

const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json'); 
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const TOKEN_PATH = path.join(__dirname, 'tokens.json');

async function generateToken() {
  try {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));

  
    if (!credentials.web || !credentials.web.redirect_uris) {
      throw new Error("redirect_uris est manquant dans les informations d'identification.");
    }

    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
  } catch (error) {
    console.error("Erreur lors de la génération du token:", error.message);
  }
}

generateToken().catch(console.error);
