var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var agencySchema = new Schema({
    name: { type: String, required: [true, 'Name not found'] },
    phoneno: { type: Number, required: [true, 'Phone No not found'] },
    address: {
      address1: String,
      address2: String,
      city: String,
      state: String,
      zipCode: String
    },
    createdDate: { type: Date, default: Date.now }
  });

  module.exports = {
    "AgencyModel": mongoose.model('AgencyModel', agencySchema)
  }



