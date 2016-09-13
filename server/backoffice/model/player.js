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
			}
		}, 
		type: [Number], // 1->Player 2->Coach 3->delegate 4->ref
		position: [String],
		imgs: 
		[
			{
				src: String,
				order: Number
			}
		], 
		dob: Date, // Date of birth
		cc: Number
	}, 
	{	// Opções
		collection: "players",
		timestamps: true
	}
)

let Player = mongoose.model("players", PlayerSchema)

module.exports = Player