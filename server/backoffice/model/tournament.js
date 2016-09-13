"use strict"
// Dependências
let mongoose = require("mongoose")
let Schema = mongoose.Schema

//Model
const TorneioSchema = new Schema(
	{
		status: Boolean,
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
		teams: [
			{
				id: Schema.Types.ObjectId
			}
		],
		games: 
		[
			{
				id: Schema.Types.ObjectId
			}
		]
	}, 
	{	// Opções
		collection: "torneios",
		timestamps: true
	}
)

let Torneio = mongoose.model("torneios", TorneioSchema)

module.exports = Torneio