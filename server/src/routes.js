const express = require('express');
const routes = express.Router();

const stream = require('./getFilteredStreamRules');

routes.get('/stream/rules', async (req, res, next) => {
  try {
    const data = await stream.getFilteredStreamRules()
    res.json(data)
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }
});

module.exports = routes;