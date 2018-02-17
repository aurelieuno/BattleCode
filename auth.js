const GoogleAuth = require('google-auth-library');

const auth = new GoogleAuth;
const CLIENT_ID = '175201881607-unus57bf225b5t59emkpsb0bavj1a9ae.apps.googleusercontent.com';
const client = new auth.OAuth2(CLIENT_ID);
exports.tokenCheck = (token, cb) => {
  client.verifyIdToken(
    token,
    CLIENT_ID,
    (e, login) => {
      const payload = login.getPayload();
      // const userid = payload.sub;
      cb({
        email: payload.email,
      });
    })};
