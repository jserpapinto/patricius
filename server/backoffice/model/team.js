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
		tournaments: 
		[
			{
				id: Schema.Types.ObjectId,
				place: Number // 1 - Campeao | 2 - Vice | 3 - Meias Finais | 4 - Quartos de final
			}
		]
	}, 
	{	// Opções
		collection: "teams",
		timestamps: true
	}
)

let Team = mongoose.model("teams", TeamSchema)

module.exports = Team