/*
  Import the Mongoose library
*/
import mongoose, {Schema} from 'mongoose';

/*
  Create the History schema
*/
const schema : Schema = new mongoose.Schema({
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
export default mongoose.model('History', schema, 'history');