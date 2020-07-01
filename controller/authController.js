const message = require('../config/messages')
const dataValidator = require("../helper/dataValidator");
const authProvider = require("../provider/authProvider");
const console = require('../logger');

const addUpdateAgency = async (req, res) => {
    try {
        // Checking for non-empty body
        if (!req.body) {
            return _handleResponse(req, res, message.error.REQ_BODY_EMPTY);
        }

        // Validating Request based on Input for add and update
        let agencyDoc = await dataValidator.validateAddUpdateObject(req.body);
        let agencyResponse = {};
        // Redirecting for further process based on type of call (add/update)
        if(agencyDoc.agencyId){
            agencyResponse = await authProvider.updateAgency(agencyDoc);
        }else{
            agencyResponse = await authProvider.addAgency(agencyDoc);
        }
        return _handleResponse(req, res, null, agencyResponse);
    } catch (e) {
        return _handleResponse(req, res, e);
    }
}

const updateClient = async (req, res) => {
    try {
        // Checking for non-empty body
        if (!req.body) {
            return _handleResponse(req, res, message.error.REQ_BODY_EMPTY);
        }
        // Validating Update client request
        let clientDoc = await dataValidator.validateUpdateClientObject(req.body);
        // Processing and preparing response
        const clientResponse = await authProvider.updateClient(clientDoc);
        return _handleResponse(req, res, null, clientResponse);
    } catch (e) {
        return _handleResponse(req, res, e);
    }
}

const deleteAgency = async (req, res) => {
    try {
        // Checking for non-empty body
        if (!req.body) {
            return _handleResponse(req, res, message.error.REQ_BODY_EMPTY);
        }
        // Validating if agency is uniquely identified
        let agencyDoc = await dataValidator.validateUniqueAgencyObject(req.body);
        
        // Processing and preparing response
        const agencyResponse = await authProvider.deleteAgency(agencyDoc);
        
        return _handleResponse(req, res, null, agencyResponse);
    } catch (e) {
        return _handleResponse(req, res, e);
    }
}

const getClients = async (req, res) => {
    try {
        // fetching all data of clients
        const response = await authProvider.getClients();
        return _handleResponse(req, res, null,response);
    } catch (e) {
        return _handleResponse(req, res, e);
    }
}

module.exports = {
    addUpdateAgency,
    updateClient,
    deleteAgency,
    getClients
}