import { Schema, SchemaTypes, model } from "mongoose";

export const User = model(
	"user",
	new Schema({
		username: {
			type: SchemaTypes.String,
			required: true,
			unique: true,
		},
		password: {
			type: SchemaTypes.String,
			required: true,
		},
		role: {
			type: SchemaTypes.String,
			default: "user",
		},
		created: {
			type: SchemaTypes.Date,
			default: Date.now,
			required: true,
		},
	})
);

export const Item = model(
	"item",
	new Schema({
		name: {
			type: SchemaTypes.String,
			required: true,
			unique: true,
		},
		price: {
			type: SchemaTypes.Number,
			required: true,
		},
		stocks: {
			type: SchemaTypes.String,
			required: true,
			default: 999,
		},
	})
);
