var express = require('express');
var router = express.Router();
const authController = require("../controller/authController")
const auth = require("../utils/authMiddleware")

// Authenticated Routes for Agency and Client
router.put('/addAgency',auth.verifySubscription,authController.addUpdateAgency);
router.post('/updateClient',auth.verifySubscription,authController.updateClient);
router.delete('/deleteAgency',auth.verifySubscription,authController.deleteAgency);
router.get('/clients',auth.verifySubscription,authController.getClients);

module.exports = router