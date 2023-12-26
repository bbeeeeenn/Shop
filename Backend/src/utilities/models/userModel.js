import { Schema, SchemaTypes, model } from "mongoose";

const userSchema = new Schema({
	username: {
		type: SchemaTypes.String,
		required: true,
		unique: true,
	},
	password: {
		type: SchemaTypes.String,
		required: true,
	},
	created: {
		type: SchemaTypes.Date,
		default: Date.now,
		required: true,
	},
});

export default model("user", userSchema);
