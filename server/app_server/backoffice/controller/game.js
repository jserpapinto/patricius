"use strict"
// Dependências
let mongoose = require("mongoose")
let mongotypes = mongoose.Types	
let db = require("../../../db")
let moment = require("moment")
let multer = require("multer")
// Model
let Model = require("../model/game")

// Date configs
moment.locale('pt-PT');

const Game = () => {


	/********************************
	*    GET JSON DO GAME        *
	********************************/
	let getOne = (req, res, next) => {
		let oneId = req.params.id
		// find one
		Model.findOne({_id: mongotypes.ObjectId(oneId)}, (err, doc) => {
			// handle err
			if (err) throw err

			res.json(doc)
			res.end()
		})
	}


	let getAllFromTournament = (req, res, next) => {
		// get id param
		let tounramentID = req.params.id
		// Get all games from tournament
		ModelTournament.find({_id: tounramentID}, (err, docs) => {
			if (err) throw err // handle err

			// get array of game ids
			let gameIds = docs.map((g) => g.id)

			// get models from games with the ids gotten before
			Model.find({'_id': {
				$in: [gameIds]
			}}, (err, docs) => {
				if (err) throw err

				let output = docs.map((g) => {
					
				})
				// resposta
				res.json(output)
				res.end()

			}) // .Model

		}) // .ModelTournament

	} // .getAllFromTournament

	return {
		getOne: getOne,
		getAllFromTournament: getAllFromTournament
	}
}

module.exports = Game()