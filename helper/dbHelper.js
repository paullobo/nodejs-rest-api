const mongoose = require('mongoose');
const { AgencyModel } = require("../schema/agency");
const { ClientModel } = require("../schema/client")
const console = require('../logger');
const { COLLECTIONS } = require('../config/constant');
const messages = require('../config/messages');

class DbHelper {

    async connect() {
        if (!this.db) {
            try {
                await mongoose.connect(`${process.env.NODE_ENV == 'production' ? process.env.DB_PRODUCTION_URI : process.env.DB_STAGING_URI}`, { useNewUrlParser: true });
                this.db = mongoose.connection;
                console.log("MongoClient Connection successfull.");
                return;
            } catch (e) {
                console.error("DbHelper Error while connect mongodb ::: ", e);
                throw Error(e)
            }
        }
    }

    async insertDocument(collection, docObj) {
        try {
            if (Object.keys(docObj).length === 0 && docObj.constructor === Object) {
                throw Error("mongoClient.insertDocumentWithIndex: document is not an object");
            }
            let modelInstance;
            console.log('COLLENECTION NAMR',collection)
            if (collection == COLLECTIONS.AGENCY_COLLECTION) {
                modelInstance = new AgencyModel(docObj);
            }else if (collection == COLLECTIONS.CLIENT_COLLECTION) {
                modelInstance = new ClientModel(docObj);
            }else {
                throw Error(messages.error.INVALID_COLLECTION);
            }
            await this.connect();
            return await modelInstance.save()
        } catch (e) {
            console.error("DbHelper mongoClient.insertDocumentWithIndex: Error caught,", e);
            throw Error(e)
        }
    }

    async updateDocument(collection, _id, data) {
        try {
            let Model;
            if (collection == COLLECTIONS.AGENCY_COLLECTION) {
                Model = AgencyModel;
            }else if(collection == COLLECTIONS.CLIENT_COLLECTION) {
                Model = ClientModel;
            } else {
                throw Error(messages.error.INVALID_COLLECTION);
            }
            await this.connect();
            return await Model.findOneAndUpdate({ _id: mongoose.Types.ObjectId(_id) }, data, { new: false })
        } catch (e) {
            console.error("DbHelper Error while updateDocument ::: ", e);
            throw (e)
        }
    }

    async getAgencyByName(name) {
        try {
            await this.connect();
            let agencyData = await AgencyModel.findOne({ name })
            return agencyData;
        } catch (e) {
            console.error("DbHelper Error while getAgencyByName ::: ", e);
            throw (messages.error.AGENCY_NOT_FOUND)
        }
    }

    async getAgencyById(agencyId) {
        try {
            await this.connect();
            let agencyData = await AgencyModel.findOne({ _id:mongoose.Types.ObjectId(agencyId) })
            return agencyData;
        } catch (e) {
            console.error("DbHelper Error while getAgencyById ::: ", e);
            throw (messages.error.AGENCY_NOT_FOUND)
        }
    }

    async getClientById(id) {
        try {
            await this.connect();
            let clientData = await ClientModel.findOne({ _id: mongoose.Types.ObjectId(id) })
            return clientData;
        } catch (e) {
            console.error("DbHelper Error while getClientById ::: ", e);
            throw messages.error.CLIENT_NOT_FOUND;
        }
    }
    
    async getAllClients(params={},limit=100,page=1) {
        try {
            await this.connect();
            let clients = await ClientModel.find(params).populate('agencyId','name').sort({totalBill: 'desc'}).limit(limit * 1).skip((page - 1) * limit).exec();
            return clients;
        } catch (e) {
            console.error("DbHelper Error while getAllClients ::: ", e);
            throw (e)
        }
    }

    async deleteAgencyById(_id){
        try {
            await this.connect();
            return await AgencyModel.deleteOne({_id:mongoose.Types.ObjectId(_id)});
            
        } catch (e) {
            console.error("DbHelper Error while deleteAgencyById ::: ", e);
            throw (e);
        }
    }

    async deleteClientsByAgencyId(agencyId){
        try {
            await this.connect();
            return await ClientModel.deleteMany({agencyId:mongoose.Types.ObjectId(agencyId)});
            
        } catch (e) {
            console.error("DbHelper Error while deleteClientsByAgencyId ::: ", e);
            throw (e);
        }
    }

    async close() {
        return await this.db.close()
    }
}

module.exports = {
    DbHelper
}