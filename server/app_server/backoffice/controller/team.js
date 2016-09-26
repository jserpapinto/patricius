"use strict"
// Dependências
let mongoose = require("mongoose")
let mongotypes = mongoose.Types	
let db = require("../../../db")
// Model
let Model = require("../model/team")

// Factory Function
const Team = () => {

	/********************************
	*    	 PRIVATE METHODS         *
	********************************/
	let mountTeam = (equipa) => {
	}

	/********************************
	*    GET JSON DE TEAMS        *
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
	*      INSERIR NOVO TEAM      *
	********************************/
	let post = (req, res, next) => {

		let t = req.body.team
		// handle requirements
		if (t.name == undefined || t.name == "") return res.send({error:"Nome não preenche requisitos"})

		// mount new team
		let team = new Model({
			name: t.name,
			imgs: t.imgs || null,
			players: t.players || null
		})

		team.save(team, (err, docs) => {
			if (err) return res.status(500).send({error: err }).end()

			res.status(200).send(true)
		})
	}

	/********************************
	*    	  UPDATE TEAM         *
	********************************/
	let put = (req, res, next) => {
		// get id
		let updateId = mongotypes.ObjectId(req.params.id)
		// Campos a inserir
		// n posso passar _id pq é imutável, portanto nao dá pra fazer new Model()
		let t = Object.assign(req.body.team, {}) 

		Model.findOneAndUpdate(
			{ _id: updateId }, // query
			t, // new doc
			{upsert: false},// options
			(err, doc) => { // callback
				if (err) throw err
				res.end("TEAM atualizada")
			}
		)
	}

	/********************************
	*    	  DELETE TEAM         *
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

module.exports = Team()