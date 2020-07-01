const { Validator } = require('node-input-validator');
const message = require('../config/messages');
const { DbHelper } = require("../helper/dbHelper");
const dbInstance = new DbHelper(); 

module.exports = {

    validateAddUpdateObject: async function (dataObj) {
        let { name } = dataObj;
        if(!name){
            throw('Agency name is mandatory')
        }
        try{
            let agencyExist = await dbInstance.getAgencyByName(name);
            dataObj.agencyId = agencyExist._id;
            return await this.validateUpdateAgencyObject(dataObj)
        }catch(e){
            return await this.validateAddAgencyObject(dataObj)
        }
    },

    validateAddAgencyObject: async function (dataObj) {
        let { name, phoneno, address1, address2, city, state, zipCode, clients } = dataObj
        
        const v = new Validator(dataObj, {
            name:'required',
            phoneno: 'required|phoneNumber|minLength:10',
            address1:'required',
            address2:'required',
            city:'required',
            state:'required'
        });

        let matched = await v.check();
        if (!matched) {
            throw ({agency:v.errors})
        }

        let clientList = [];
        if(clients && clients.length>0){
            if(Array.isArray(clients)){
                for(let c of clients){

                    const vc = new Validator(c, {
                        name:'required',
                        email: 'required|email',
                        phoneno: 'required|phoneNumber|minLength:10',
                        totalBill:'required|integer'
                    });

                    let foundError = await vc.check();
                    if (!foundError) {
                        throw ({clients:vc.errors})
                    }else{
                        clientList.push({
                            name:c.name,
                            email:c.email.toLowerCase(),
                            phoneno:Number(c.phoneno),
                            totalBill:Number(c.totalBill)
                        })
                    }
                }
            }else{
                throw ("Invalid client data format");
            }
        }else{
            throw ("Please provide atleast 1 agency");
        }


        return {
            name:name,
            phoneno:phoneno,
            address: {
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                zipCode: zipCode,
            },
            clients:clientList
        }
        
    },

    validateUpdateAgencyObject: async function (dataObj) {
        let { agencyId, name, phoneno, address1, address2, city, state, zipCode, clients } = dataObj
        
        const v = new Validator(dataObj, {
            name:'string',
            phoneno: 'phoneNumber|minLength:10'
        });

        let matched = await v.check();
        if (!matched) {
            throw ({agency:v.errors})
        }

        let clientList = [];
        if(clients && clients.length>0){
            if(Array.isArray(clients)){
                for(let c of clients){

                    const vc = new Validator(c, {
                        name:'required',
                        email: 'required|email',
                        phoneno: 'required|phoneNumber|minLength:10',
                        totalBill:'required|integer'
                    });

                    let foundError = await vc.check();
                    if (!foundError) {
                        throw ({clients:vc.errors})
                    }else{
                        clientList.push({
                            name:c.name,
                            email:c.email.toLowerCase(),
                            phoneno:Number(c.phoneno),
                            totalBill:Number(c.totalBill)
                        })
                    }
                }
            }else{
                throw ("Invalid client data format");
            }
        }


        return {
            agencyId:agencyId,
            name:name,
            phoneno:phoneno,
            address: {
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                zipCode: zipCode,
            },
            clients:clientList
        }
        
    },

    validateUpdateClientObject: async function (dataObj) {
        let { clientId, name, email,phoneno,totalBill } = dataObj
      
        const v = new Validator(dataObj, {
            clientId:'required|string',
            name:'string',
            email: 'email',
            phoneno: 'phoneNumber|minLength:10',
            totalBill:'integer'
        });

        let matched = await v.check();
        if (!matched) {
            throw ({agency:v.errors})
        }

        return {
            clientId:clientId,
            name:name,
            email:email ? email.toLowerCase() : null,
            phoneno:phoneno ? Number(phoneno) : null,
            totalBill:totalBill ? Number(totalBill):null
        }
        
    },

    validateUniqueClientObject: async function (dataObj) {
        let { clientId } = dataObj
        
        if(!clientId){
            throw('Cannot identify client, please provide agency name or clientId');
        }

        return {
            clientId:clientId
        }
        
    },

    validateUniqueAgencyObject: async function (dataObj) {
        let { agencyId } = dataObj
        
        if(!agencyId){
            throw('Cannot identify agency, please provide agency name or agencyId');
        }
        

        return {
            agencyId:agencyId
        }
        
    }
}