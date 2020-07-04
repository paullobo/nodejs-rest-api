const message = require('../config/messages')
const { DbHelper } = require("../helper/dbHelper");
const { COLLECTIONS } = require("../config/constant");

//create instance of 
const dbInstance = new DbHelper(); 

const addAgency = async (agencyDoc) => {
    try {
        //check if agency exist with same name
        let {name,clients} = agencyDoc;
        let agencyExist = await dbInstance.getAgencyByName(name);
        if (agencyExist) {
            throw (message.error.AGENCY_ALREADY_EXIST);
        }

        // Create an entry for agency
        let createdAgency = await dbInstance.insertDocument(COLLECTIONS.AGENCY_COLLECTION, agencyDoc)

        // Create an entries for corresponding clients
        let clientIds = [];
        for(let i=0;i<clients.length;i++){
            let client = clients[i];
            client.agencyId = createdAgency._id;
            let clientcreated = await dbInstance.insertDocument(COLLECTIONS.CLIENT_COLLECTION, client)
            clientIds.push(clientcreated._id)
        }
        
        return {
            agencyId:createdAgency._id,
            clients:clientIds
        };

    } catch (e) {
        throw (e);
    }
}

const updateAgency = async (agencyDoc) => {
    try {
        let {clients,agencyId} = agencyDoc;
       
        // Update Agency with new data
        await dbInstance.updateDocument(COLLECTIONS.AGENCY_COLLECTION,agencyId,agencyDoc);

        // Create an entries for corresponding clients
        if(clients && clients.length>0){
            for(let i=0;i<clients.length;i++){
                let client = clients[i];
                client.agencyId = agencyId;
                let clientcreated = await dbInstance.insertDocument(COLLECTIONS.CLIENT_COLLECTION, client)
            }
        }

        return message.success.AGENCY_UPDATED_SUCCESS;

    } catch (e) {
        throw (e);
    }
}

const updateClient = async (clientDoc) => {
    try {
        //check if client exist with same name
        let {clientId,name,email,phoneno,totalBill} = clientDoc;

        // Check for existence
        let clientExist = await dbInstance.getClientById(clientId);
        if (!clientExist) {
            throw (message.error.CLIENT_NOT_FOUND);
        }

        // Update data is there any, check
        if(!name && !email && !phoneno && !totalBill){
            throw (message.error.CLIENT_UPDATE_DATA_NEEDED);
        }

        // Update Client with new data
        await dbInstance.updateDocument(COLLECTIONS.CLIENT_COLLECTION,clientId,clientDoc);

        return message.success.CLIENT_DETAILS_UPDATED;

    } catch (e) {
        throw (e);
    }
}

const getClients = async (doc={}) => {
    try {

        // For pagination
        // const {objectId,page=1,limit=10} = doc;
        // let count = 0;

        let clientList =[];
        // Get all clients and corresponding agency data
        let clients = await dbInstance.getAllClients();
       // let agenciesCount = await dbInstance.getAllCount();

       // Format the client list data-set
        if(clients && clients.length>0){
            for(c of clients){
                clientList.push({
                    clientId:c._id,
                    clientName:c.name,
                    agencyId:c.agencyId && c.agencyId._id? c.agencyId._id:'',
                    agencyName:c.agencyId && c.agencyId.name? c.agencyId.name:'',
                    totalBill:c.totalBill,
                })
            }
        }

        return {
            clients:clientList,
            //totalPages: Math.ceil(agenciesCount / limit),
            //currentPage: page
        };

    } catch (e) {
        throw (e);
    }
}

const getMaxBill = async () => {
    try {

        // Get only on maximum total bill client across agencies
        let clients = await dbInstance.getAllClients({},1);
        let clientList =[];
        if(clients && clients.length>0){
            for(c of clients){
                clientList.push({
                    clientId:c._id,
                    clientName:c.name,
                    agencyId:c.agencyId && c.agencyId._id? c.agencyId._id:'',
                    agencyName:c.agencyId && c.agencyId.name? c.agencyId.name:'',
                    totalBill:c.totalBill,
                })
            }
        }

        return {
            client:clientList
        };

    } catch (e) {
        throw (e);
    }
}

const getMaxBills = async () => {
    try {

        // Get all clients and corresponding agency data
        let clients = await dbInstance.getMaxBillClients();
        let clientList =[];

        if(clients && clients.length>0){
            for(c of clients){

                clientList.push({
                    clientId:c._id,
                    clientName:c.name,
                    agencyId:c.agencyId && c.agencyId[0]._id? c.agencyId[0]._id:'',
                    agencyName:c.agencyId && c.agencyId[0].name? c.agencyId[0].name:'',
                    totalBill:c.totalBill,
                })
            }
        }

        return {
            clients:clientList
        };

    } catch (e) {
        throw (e);
    }
}
 
const deleteAgency = async (doc,token) => {
    try {
        const {agencyId} = doc;
        
        // Check for Existence
        let agencyExist = await dbInstance.getAgencyById(agencyId);
        if (agencyExist) {
            
            // Delete Agency using agency Id
            await dbInstance.deleteAgencyById(agencyId);
            
            // Delete all clients corresponding to agency Id
            await dbInstance.deleteClientsByAgencyId(agencyId);

            return (message.success.AGENCY_DELETED_SUCCESS);
        }else{
            throw (message.error.AGENCY_NOT_FOUND);
        }
    } catch (e) {
        throw (e);
    }
} 

module.exports = {
    addAgency,
    updateAgency,
    updateClient,
    deleteAgency,
    getClients,
    getMaxBill,
    getMaxBills
}