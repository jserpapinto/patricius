"use strict"
// Dependências
let mongoose = require("mongoose")
let Schema = mongoose.Schema

//Model
const TeamSchema = new Schema(
	{
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
				order: Number
			}
		],
		players: [
			{
				id: Schema.Types.ObjectId,
			}
		]
	}, 
	{	// Opções
		collection: "teams",
		timestamps: true
	}
)

mongoose.model("Team", TeamSchema)
