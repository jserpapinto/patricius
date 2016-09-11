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
		arenas: [String],
		 /* 
		 *	Sentido das queries.
		 *	Vamos mais vezes ver as equipas que pertencem a um torneio
		 *	do que os torneios que pertencem à equipa.
		 *	Como também mais vezes vamos ver os jogadores que pertencem
		 *	a uma equipa do que quantas equipas pertencem ao player.
		 */
		teams: [
			{
				id: Schema.Types.ObjectId,
				coach: {
					id: Schema.Types.ObjectId
				},
				delegate: {
					id: Schema.Types.ObjectId
				},
				players: [
					{
						id: Schema.Types.ObjectId,
						status: Boolean
					}
				]
			}
		],
		games: 
		[
			{
				/* 
				*	Obrigatórios
				*/
				date: Date,
				fase: String, // campeonato | quartos | meias | final
				arena: String,
				/*
				*	Teams apenas com id obrigatorio
				*/
				teams: [ // Apenas duas
					{
						id: Schema.Types.ObjectId,
						coach: Schema.Types.ObjectId,
						delegate: Schema.Types.ObjectId,
						players: [
							{
								id: Schema.Types.ObjectId,
								number: String,
								start: Boolean, // titular
								points: Number, // 1-5
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
				],
				/*
				*	Entram no start jogo
				*/
				chronicle: String, 
				arbitro: {
					id: Schema.Types.ObjectId,
					score: Number
				},
				status: Boolean, // se ainda esta ativo
				bestPlayer: Schema.Types.ObjectId
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