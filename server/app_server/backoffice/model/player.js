"use strict"
// Dependências
let mongoose = require("mongoose")
let Schema = mongoose.Schema

//Model
const PlayerSchema = new Schema(
	{
		name: { 
			type: String, 
			index: { 
				unique: true 
			},
			required: true,
			lowercase: true,
			trim: true
		}, 
		type: {
			type: [Number], // 1->Player 2->Coach 3->delegate 4->ref
			required: true,
			min: 1,
			max: 4
		},
		position: {
			type: [String],
			lowercase: true,
			trim: true
		},
		imgs: 
		[
			{
				src: {
					type: String,
					lowercase: true,
					trim: true,
					default: 'default.png'
				},
				primary: {
					type: Boolean,
					default: false
				}
			}
		], 
		dob: { 
			type: Date, // Date of birth
			required: true
		},
		cc: {
			type: Number
		}
	}, 
	{	// Opções
		collection: "players",
		timestamps: true
	}
)

let Player = mongoose.model("players", PlayerSchema)

module.exports = Player