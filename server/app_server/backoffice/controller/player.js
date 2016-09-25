"use strict"
// Dependências
let mongoose = require("mongoose")
let db = require("../../../db")
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
				(t) => { // t = team
					// get only 1st image
					let profileImg = t.imgs.find((img) => {
							if (img.order == Math.min.apply(Math, t.imgs.map((img) => img.order)))
								return img.src
						}
					)
					if (Array.isArray(profileImg)) profileImg = profileImg[0] // se devolver >1 resultado
					// output obj
					let newt = {
						id: t._id.toString(),
						name: t.name,
						type: t.type, // 1->Player 2->Coach 3->delegate 4->ref
						positions: t.position,
						dob: t.dob,
						cc: t.cc,
						img: profileImg,
					}

					return newt
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
		console.log(oneId)
		// find one
		Model.findOne({_id: mongotypes.ObjectId(oneId)}, (err, doc) => {
			if (err) throw err

			res.json(doc)
			res.end()
		})
	}

	/********************************
	*      INSERIR NOVO JOGADOR      *
	********************************/
	let post = (req, res, next) => {

		let t = req.body.player
		// handle requirements
		let types = [1,2,3,4]
		let err = ""
		if (t.name == undefined || t.name == "") err += "Nome não preenche requisitos.\n"
		if (t.cc == undefined || !Number.isInteger(t.cc) || t.cc > 9999999 || t.cc < 1000000) err += "CC tem de ter 7 números.\n"
		if (t.dob == undefined || !moment(t.dob)) err += "DOB tem de ser uma data (ex: '22/11/1998') em string.\n"
		if (t.type == undefined || !Number.isInteger(t.type) || types.indexOf(t.type) == -1) err += "Tipo tem de ser um número entre 1-4.\n"
		if (err !== "") return res.send(err)
		
		// mount new team
		let team = new Model({
			name: t.name,
			type: t.type,
			position: t.position,
			dob: t.dob,
			cc: t.cc,
			imgs: t.imgs || null
		})

		team.save(team, (err, docs) => {
			if (err) return res.status(500).send({error: err }).end()

			res.status(200).send(true)
		})
	}

	/********************************
	*    	  UPDATE JOGADOR         *
	********************************/
	let put = (req, res, next) => {
		// get id
		let updateId = mongotypes.ObjectId(req.params.id)
		// Campos a inserir
		// n posso passar _id pq é imutável, portanto nao dá pra fazer new Model()
		let t = Object.assign(req.body.player, {}) 

		Model.findOneAndUpdate(
			{ _id: updateId }, // query
			t, // new doc
			{upsert: false},// options
			(err, doc) => { // callback
				if (err) throw err
				res.end("Player atualizado")
			}
		)
	}

	/********************************
	*    	  DELETE JOGADOR         *
	********************************/
	let del = (req, res, next) => {
		let delId = mongotypes.ObjectId(req.params.id)
		Model.remove({ _id: delId }, (err) => {
			if (err) throw err
			res.status(200).send(true)
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