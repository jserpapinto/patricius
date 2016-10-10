"use strict"
// Dependências
let mongoose = require("mongoose")
let Schema = mongoose.Schema

//Model
const TeamSchema = new Schema({
		name: { 
			type: String, 
			index: { 
				unique: true 
			}
		}, 
		imgs: 
		[
			{
				src: String,
				primary: Boolean
			}
		],
		players: [
			{
				id: Schema.Types.ObjectId,
			}
		]
	}, 
	{	// Opções
		timestamps: true
	})

let t = mongoose.model("Team", TeamSchema)

module.exports = t
