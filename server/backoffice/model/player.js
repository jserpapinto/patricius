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