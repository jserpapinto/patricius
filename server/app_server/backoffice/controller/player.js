"use strict"
// Dependências
let mongoose = require("mongoose")
let db = require("../../db")
// Model
let Model = require("../model/player")

// Factory Function
const Player = () => {

	/********************************
	*    GET JSON DE JOGADORES        *
	********************************/
	let getAll = (req, res, next) => {
		Model.find({}, (err, docs) => {
			// handle err
			if (err) throw err;

			// build with name, img0
			let output = docs.map(
				(p) => { // p = player

					// get primary image
					let profileImg = t.imgs.find((img) => {
							if (img.primary == true) // marked as true
								return img.src
						}
					)

					if (Array.isArray(profileImg)) profileImg = profileImg[0] // se devolver >1 resultado
					// output obj
					let newPlayer = {
						id: t._id.toString(),
						name: t.name,
						type: t.type, // 1->Player 2->Coach 3->delegate 4->ref
						positions: t.position,
						dob: t.dob,
						cc: t.cc,
						img: profileImg,
					}

					return newPlayer
				}
			)
			console.log(output)

			// resposta
			res.json(output)
			res.end()

		})
	}

	let getOne = (req, res, next) => {
		let oneId = req.params.id
		console.log('ID recebido pelo url', oneId)
		// find one
		Model.findOne({_id: mongotypes.ObjectId(oneId)}, (err, doc) => {

			if (err) return res.status(500).send({error: err}).end() // returning error and ending

			console.log('Doc do player a enviar na resposta', doc)
			res.json(doc)
			res.end()
		})
	}

	/********************************
	*      INSERIR NOVO JOGADOR      *
	********************************/
	let post = (req, res, next) => {

		let player = req.body.player
		
		// mount new team
		let team = new Model({
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