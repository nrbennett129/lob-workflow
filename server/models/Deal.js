const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dealSchema = new Schema({
  name: {
    type: String, 
    trim: true,
    required: [true, 'Deal must have a name.']
  },
  client: {
    type: String, 
    trim: true,
    required: [true, 'Deal must have a client.']
  },
  closingDate: Date,
  reportingDate: Date,
  csmId: {type: String, trim: true},
  acsmId: {type: Schema.Types.ObjectId, ref: 'User'},
  onId: {type: Schema.Types.ObjectId, ref: 'User'},
  waterId: {type: Schema.Types.ObjectId, ref: 'User'},
  compId: {type: Schema.Types.ObjectId, ref: 'User'},
  compQcId: {type: Schema.Types.ObjectId, ref: 'User'},
  waterQcId: {type: Schema.Types.ObjectId, ref: 'User'},
  maintIds: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = mongoose.model('Deal', dealSchema);