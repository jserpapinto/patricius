// Dependências
let mongoose = require("mongoose")
let Schema = mongoose.Schema

//Model
const CoachSchema = new Schema(
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
		dob: Date, // Date of birth
		cc: Number
	}, 
	{	// Opções
		collection: "coachs",
		timestamps: true
	}
)

let Coach = mongoose.model("coachs", CoachSchema)

module.exports = Coach