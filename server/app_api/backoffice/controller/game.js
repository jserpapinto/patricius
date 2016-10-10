"use strict"
// Dependências
let mongoose = require("mongoose")
// Model
let Model = require('../model/tournament')

// Helper
let H = require('./helper')


const Game = () => {

	/********************************
	*    GET JSON DO GAME        *
	********************************/
	let getOne = (req, res, next) => {
		if (!req.params || !req.params.tournamentid ||!req.params.gameid) {
			return H.responde(res, 400, {
				"msg": "Parametros tournamentid e gameid necessários."
			})
		}
		// find one
		Model
			.findById(req.params.tournamentid)
			.exec((err, tournament) => {
				// Err -> Bd bad request
				if (err) return H.responde(res, 400, err)

				if (!tournament) {
					return H.responde(res, 404, {
						"msg": "Torneio não encontrado."
					})
				}

				let game = 	tournament.games.id(req.params.gameid)
				if (!game) {
					return H.responde(res, 404, {
						"msg": "Jogo não encontrado."
					})
				}

				let response = {
					tournament: {
						id: req.params.tournamentid,
						name: tournament.name
					},
					game: game
				}

				return H.responde(res, 200, response)
			})
	}


	let getAllFromTournament = (req, res, next) => {
		if (!req.params || !req.params.tournamentid) {
			return H.responde(res, 400, {
				"msg": "Parametros tournamentid necessários."
			})
		}
		// find one
		Model
			.findById(req.params.tournamentid)
			.select('status date name games.fase games.teams')
			.exec((err, tournament) => {
				// Err -> Bd bad request
				if (err) return H.responde(res, 400, err)

				if (!tournament) {
					return H.responde(res, 404, {
						"msg": "Torneio não encontrado."
					})
				}

				if (!tournament.games) {
					return H.responde(res, 404, {
						"msg": "Torneio sem jogos."
					})
				}

				let response = {
					tournament: {
						id: req.params.tournamentid,
						name: tournament.name
					},
					game: tournament.games
				}

				return H.responde(res, 200, response)
			})

	} // .getAllFromTournament

	return {
		getOne: getOne,
		getAllFromTournament: getAllFromTournament
	}
}

module.exports = Game()