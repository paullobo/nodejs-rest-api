var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
    agencyId:{ type: Schema.Types.ObjectId, ref: 'AgencyModel' },
    name: { type: String, required: [true, 'Name not found'] },
    email:{ type: String, required: [true, 'Email not found'] },
    phoneno: { type: Number, required: [true, 'Phone No not found'] },
    totalBill:{ type: Number, required: [true, 'Total Bill not found'] },
    createdDate: { type: Date, default: Date.now }
  });

  module.exports = {
    "ClientModel": mongoose.model('ClientModel', clientSchema)
  }



