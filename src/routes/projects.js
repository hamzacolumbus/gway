const express = require('express');
const router = express.Router();
const config = require('../config');
const ServiceLayer = require("b1-service-layer")
const settings=  require("../db")






router.get('/', async(req, res) => {
  var sl = new ServiceLayer()
  await sl.createSession(settings).catch(data=>  console.log(data))
  await sl.find(`ProjectManagements`)
    .then(data=>{  
      res.send({data})
  })
    .catch(data=>  console.log(data)) 
})



router.get('/:project', async(req, res) => {
  const project=  req.params.project
  var sl = new ServiceLayer()
  await sl.createSession(settings).catch(data=>  console.log(data))
  await sl.find(`ProjectManagements?$filter=ProjectName eq '${project}' `)
    .then(data=>{  
      console.log(data);
      res.send({data})
  })
    .catch(data=>  console.log(data)) 
})


router.delete('/:project', async(req, res) => {
  const project=  req.params.project
  var sl = new ServiceLayer()
  await sl.createSession(settings).catch(data=>  console.log(data))
  await sl.delete(`ProjectManagements('${project}')`)
    .then(data=>{  
      console.log(data);
      res.send({data})
  })
    .catch(data=>  console.log(data)) 
})

router.put('/:project', async(req, res) => {
  const project=  req.params.project
  const data=  req.body
  console.log(data);
  var sl = new ServiceLayer()
  await sl.createSession(settings).catch(data=>  console.log(data))
  await sl.patch(`ProjectManagement(${project})`,  data)
  .then(data=>{
      res.send(data)
      console.log(data);
  })
  .catch(data=>  console.log("error"))
})

module.exports = router;