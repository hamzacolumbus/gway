const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');
const ServiceLayer = require("b1-service-layer")
const settings=  require("../db")



async  function save_user(user){
  var sl = new ServiceLayer()
  let found
  await sl.createSession(settings).catch(data=>  console.log(data))
  await sl.get(`EmployeesInfo?$filter=eMail eq '${user.preferred_username}'`)
  .then(data=>{
    console.log(data);
    data.value.length==0?  found=  null  :  found=  data.value[0]
  })
  .catch(data=>  console.log("error"))
  console.log("found  ",  found);
  if (found  !=null) {
    return found
  }
  else{
    let name=  user.name.split(' ')
    found={
      FirstName:  name[0],
      LastName:  name[1],

      eMail:  user.preferred_username
    }
    await sl.post(`EmployeesInfo`,found)
    .then(data=>{
      res.send(data)
      console.log(data);
    })
    .catch(data=>  console.log("error"))
  }
}
router.post('/', (req, res) => {
  if (req.body.token) {
    request(
      {
        method: 'GET',
        uri: `https://dev-9754813.okta.com/oauth2/default/v1/userinfo`,
        headers: {
          'Authorization': 'Bearer ' + req.body.token
        }
      },

      // callback
      (error, response, body) => {
        let user = JSON.parse(body);
        console.log(user);
        save_user(user)
      })}}
);

module.exports = router;

