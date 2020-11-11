const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');
const axios = require('axios');


const settings={
  "host": "https://ah-01.columbus-systems.de",
        "port": 50000,
        "version": "v1",
        "username" : "COL-HOSTING\\demo2",
        "password" : "SAP2020?",
        "company": "SBO_OECADV1_DEMO"
    }



router.post('/', (req, res) => {
}