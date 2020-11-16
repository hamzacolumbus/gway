const express = require('express');
const router = express.Router();
const config = require('../config');

router.get('/', (req, res) => {  
  console.log("redirect");
  res.redirect(`https://dev-9754813.okta.com/oauth2/default/v1/authorize?client_id=${config.clientID}&redirect_uri=${config.redirectURI}&response_type=code&scope=openid%20profile&state=state-test85'`);
}

);

module.exports = router;
