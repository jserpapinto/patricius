"use strict"
// Dependências
let mongoose = require("mongoose")
let Schema = mongoose.Schema

//Model
const TournamentSchema = new Schema(
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
		collection: "tournament",
		timestamps: true
	}
)

let Tournament = mongoose.model("tournament", TournamentSchema)

module.exports = Tournament