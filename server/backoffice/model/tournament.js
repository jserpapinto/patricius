// Dependências
let mongoose = require("mongoose")
let Schema = mongoose.Schema

//Model
const TorneioSchema = new Schema(
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
		games: 
		[
			{
				date: Date,
				status: Boolean,
				chronicle: String, 
				arbitro: Schema.Types.ObjectId,
				teams: [ // Apenas duas
					{
						id: Schema.Types.ObjectId,
						coach: Schema.Types.ObjectId,
						delegate: Schema.Types.ObjectId,
						bestPlayer: Schema.Types.ObjectId,
						players: [
							{
								id: Schema.Types.ObjectId,
								number: String,
								start: Boolean, // titular
								ponctuation: Number, // 1-5
								goals: [Number], // minutos
								discipline: [
									{
										yellow: Number,
										Blue: Number,
										Red: Number
									}
								]
							}
						]
					}
				]
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