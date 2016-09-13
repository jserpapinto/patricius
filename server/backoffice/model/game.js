"use strict"
// Dependências
let mongoose = require("mongoose")
let Schema = mongoose.Schema

//Model
const GameSchema = new Schema(
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
)

let Player = mongoose.model("players", PlayerSchema)

module.exports = Player