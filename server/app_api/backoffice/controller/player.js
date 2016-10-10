"use strict"
// Dependências
let mongoose = require("mongoose")
// Model
let Model = require('../model/player')

// Helper
let H = require('./helper')

// Factory Function
const Player = () => {

	/********************************
	*    GET JSON DE JOGADORES        *
	********************************/
	let getAll = (req, res, next) => {
		// Find all
		Model
			.find({})
			.select('name type position imgs dob cc')
			.exec((err, playerList) => {
				// Err -> Bd bad request
				if (err) return H.responde(res, 400, err)

				//Err -> Não há torneios na db
				if (!playerList || playerList.length === 0) {
					return H.responde(res, 404, {
						"msg": "Não há jogadores na bd."
					})
				}
				
				return H.responde(res, 200, playerList)
			})
	}

	let getOne = (req, res, next) => {
		// Err -> Sem parametros
		if (!req.params || !req.params.playerid) {
			return H.responde(res, 400, {
				"msg": "Pedido sem parametro: playerid."
			})
		}

		// find one
		Model
			.findById(req.params.playerid)
			.exec((err, player) => {
				// handle err
				if (err) return H.responde(res, 400, err)

				return H.responde(res, 200, player)
			})
	}

	/********************************
	*      INSERIR NOVO JOGADOR      *
	********************************/
	let post = (req, res, next) => {

		let player = req.body.player
		
		// mount new player
		player = new Model({
			name: player.name,
			type: player.type,
			position: player.position,
			dob: player.dob,
			cc: player.cc,
			imgs: player.imgs || null
		})

		team.save(player, (err, docs) => {
			if (err) return res.status(500).send({error: err}).end() // returning error and ending

			res.status(200).send(true) // everything good, 200 OK
		})
	}

	/********************************
	*    	  UPDATE JOGADOR         *
	********************************/
	let put = (req, res, next) => {
		// get id
		let updateId = mongotypes.ObjectId(req.params.id)

		// n posso passar _id pq é imutável, portanto nao dá pra fazer new Model()
		let player = Object.assign(req.body.player, {}) 

		Model.findOneAndUpdate(
			{ _id: updateId }, // query
			player, // new doc
			{upsert: false},// options
			(err, doc) => { // callback
				if (err) return res.status(500).send({error: err}).end() // returning error and ending

				res.status(200).send(true) // everything good, 200 OK
			}
		)
	}

	/********************************
	*    	  DELETE JOGADOR         *
	********************************/
	let del = (req, res, next) => {
		let delId = mongotypes.ObjectId(req.params.id)
		Model.remove({ _id: delId }, (err) => {
			if (err) return res.status(500).send({error: err}).end() // returning error and ending

			res.status(200).send(true) // everything good, 200 OK
		})
	}

	/********************************
	*    	  PUBLIC METHODS         *
	********************************/
	return {
		getAll: getAll,
		getOne: getOne,
		post: post,
		put: put,
		delete: del
	}

}

module.exports = Player()