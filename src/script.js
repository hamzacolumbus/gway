/* OAuth return from FusionAuth */
router.get('/oauth-redirect', function (req, res, next) {
    // This code stores the user in a server-side session
    const stateFromServer = req.query.state;
    if (stateFromServer !== req.session.stateValue) {
      console.log("State doesn't match. uh-oh.");
      console.log("Saw: "+stateFromServer+ ", but expected: "+req.session.stateValue);
      res.redirect(302, '/');
      return;
    }
    client.exchangeOAuthCodeForAccessToken(req.query.code,  clientId,  clientSecret,'http://localhost:3000/oauth-redirect')
        .then((response) => {
          console.log(response.response.access_token);
          return client.retrieveUserUsingJWT(response.response.access_token);
        })
        .then((response) => {
          req.session.user = response.response.user;
        })
        .then((response) => {
          res.redirect(302, '/');
        }).catch((err) => {console.log("in error"); console.error(JSON.stringify(err));});
  });
  const request = require('request');
  const {FusionAuthClient} = require('@fusionauth/typescript-client');
  const client = new FusionAuthClient('noapikeyneeded', 'http://localhost:9011');
  const checkAuthentication = require('../middleware');
  app.use(express.json());