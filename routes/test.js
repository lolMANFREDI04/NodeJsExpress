// file: routes/test.js

const express = require('express');
const router = express.Router();

const keycloak = require("#middlewares/keycloak");


// Test Route
router.get('/test', [keycloak.protect()],(req, res) => {
  res.json({
    message: "API connection established.",
    status: "success"
  })
  .status(200);
});

module.exports = router;