const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');

router.get('/', (req, res) => {
  request(
    // POST request to /token endpoint
    {
      method: 'POST',
      uri: `https://dev-9754813.okta.com/oauth2/default/v1/token`,
      form: {
        'client_id': config.clientID,
        'client_secret': config.clientSecret,
        'code': req.query.code,
        'grant_type': 'authorization_code',
        'redirect_uri': config.redirectURI,
        'accept': 'application/json'
        //'authorization': `Basic ${req.query.code}`
      },
    },

    // callback
    (error, response, body) => {
      // save token to session
      console.log(body);
      req.session.token = JSON.parse(body).access_token;
      req.session.save()
      // redirect to the Angular app
      res.redirect(`http://localhost:${config.clientPort}/get_token?token=${JSON.parse(body).access_token}`);
    }
  );
});



module.exports = router;