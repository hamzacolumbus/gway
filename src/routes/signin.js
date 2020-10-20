const express = require('express');
const router = express.Router();
const config = require('../config');
const axios = require('axios');


router.post('/', (req, res) => {
axios.default.post(
  `http://localhost:${config.fusionAuthPort}/api/user`,
  req.body,
  {
    headers:{
      'Authorization': config.apiKey
    }
  })
  .then((resp)=>{
    console.log(resp.data.user.id);
    axios.default.post(
      `http://localhost:${config.fusionAuthPort}/api/user/registration/${resp.data.user.id}`,
      {  registration:{
        applicationId:  config.applicationID
      }         
    },
      {
        headers:{
          'Authorization': config.apiKey
        }
      }).then((resp)=>{
        console.log("registered");
        res.redirect(`http://localhost:${config.clientPort}/login`);
      }).catch((resp)=>{
        console.log(resp);
      })
  }).catch((resp)=>{
    console.log("create  error");
  })
})

module.exports = router;