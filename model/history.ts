/*
  Import the Mongoose library
*/
const mongoose = require('mongoose');

/*
  Import the Time utility
*/
const Time = require('../utils/time');

/*
  Create the History schema
*/
const schema = mongoose.Schema({
	collection_name: {
		type: String,
		required: 'Collection name is required.'
	},
	collection_field: {
		type: String,
		required: 'Field name is required.'
	},
	old_value: {
		type: mongoose.Schema.Types.Mixed,
		required: 'Old value is required.'
	},
	new_value: {
		type: mongoose.Schema.Types.Mixed,
		required: 'New value is required.'
	},
  object_id: {
    type: mongoose.Schema.Types.ObjectId
  },
}, {
  versionKey: 'version_key',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

/*
  Export the History model
*/
module.exports = mongoose.model('History', schema);