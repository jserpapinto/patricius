"use strict"
// Dependências
let mongoose = require("mongoose")
let db = require("../../db")
// Model
let Model = require("../model/tournament")

// Factory Function
const Tournament = () => {

	/********************************
	*    	 PRIVATE METHODS         *
	********************************/
	let mountTournament = (req) => {
		return new Model({
			status: req.body.tournament.status,
			name: req.body.tournament.name,
			img: req.body.tournament.img,
			teams: req.body.tournament.teams || [],
			games: req.body.tournament.games || [],
		})
	}

	/********************************
	*    GET JSON DE TORNEIOS        *
	********************************/
	let get = (req, res, next) => {
		// Find all
		Model.find({}, (err, docs) => {
			// handle err
			if (err) throw err

			// resposta
			res.json(docs)
			res.end()
		})
	}

	/********************************
	*      INSERIR NOVO TORNEIO      *
	********************************/
	let post = (req, res, next) => {
		// Campos a inserir
		let tournament = mountTournament(req)

		// Data validations
		if (!tournament.name || !tournament.status) res.end("Não tem nome ou status")


		tournament.save(tournament, (err, docs) => {
			if (err) res.send(500, { error: err })
			res.end("Torneio inserido")
		})
	}

	/********************************
	*    	  UPDATE TORNEIO         *
	********************************/
	let put = (req, res, next) => {
		// Campos a inserir
		// n posso passar _id pq é imutável, portanto nao dá pra fazer new Model()
		let tournament = Object.assign(req.body.torneio, {}) 

		Model.findOneAndUpdate(
			{ name: req.body.unique }, // query
			tournament, // new doc
			{upsert: true},//options
			(err, doc) => { // callback
				if (err) throw err
				res.end("Torneio atualizado")
			}
		)
	}

	/********************************
	*    	  DELETE TORNEIO         *
	********************************/
	let del = (req, res, next) => {
		let name = req.body.torneio.name
		Model.remove({ name: name }, (err) => {
			if (err) throw err
			res.send("Torneio apagado")
		})
	}

	/********************************
	*    	  PUBLIC METHODS         *
	********************************/
	return {
		get: get,
		post: post,
		put: put,
		delete: del
	}

}

module.exports = Tournament()