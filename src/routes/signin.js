const express = require('express');
const router = express.Router();
const config = require('../config');
const axios = require('axios');
var https = require('https')
var fs= require('fs')
const ServiceLayer = require("b1-service-layer")
let routeid
let bsession
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


const settings={
  "host": "https://ah-01.columbus-systems.de",
        "port": 50000,
        "version": "v1",
        "username" : "COL-HOSTING\\demo2",
        "password" : "SAP2020?",
        "company": "SBO_OECADV1_DEMO"
    }
router.post('/login', async(req, res) => {
  var sl = new ServiceLayer()
  await sl.createSession(settings).catch(data=>  console.log(data))
  await sl.find(`Projects`)
    .then(data=>{  
      console.log(data);
      res.send({data})
  })
    .catch(data=>  console.log(data)) 
})

85


module.exports = router;