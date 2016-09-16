"use strict"
// Dependências
let mongoose = require("mongoose")
let mongotypes = mongoose.Types	
let db = require("../../db")
let moment = require("moment")
// Model
let Model = require("../model/tournament")

// Date configs
moment.locale('pt-PT');

// Factory Function
const Tournament = () => {

	/********************************
	*    	 PRIVATE METHODS         *
	********************************/

	/********************************
	*    GET JSON DE TORNEIOS        *
	********************************/
	let getAll = (req, res, next) => {
		// Find all
		Model.find({}, (err, docs) => {
			// handle err
			if (err) throw err

			//build with names, tipo, date, imgs
			let output = docs.map((t) =>  {
					let d = t.date
					let newt = {
						id: t._id.toString(),
						name: t.name,
						date: moment(d, "DD/MM/YYYY"),
						type: t.type,
						imgs: t.imgs
					}

					return newt
				} 
			);
			console.log(output)


			// resposta
			res.json(output)
			res.end()
		})
	}

	let getOne = (req, res, next) => {
		let oneId = req.params.id
		//find one
		Model.findOne({_id: mongotypes.ObjectId(oneId)}, (err, doc) => {
			//handle err
			if (err) throw err

			res.json(doc)
			res.end()
		})
	}

	/********************************
	*      INSERIR NOVO TORNEIO      *
	********************************/
	let post = (req, res, next) => {

		// constroi novo modelo para inserir
		let mountTournament = (t) => { // t = tournament
			console.log(t)
			return new Model({
				status: t.status || null,
				name: t.name || null,
				type: t.type || null,
				date: moment(t.date) || new Date(), // poe data em iso
				imgs: t.img || [],
				teams: t.teams || [],
				games: t.games || [],
				created_at: new Date(),
			})
		}
		// Campos a inserir
		console.log("POST ____ :)")
		let tournament = mountTournament(req.body.tournament)

		// Data validations
		//if (!tournament.name || !tournament.status || !tournament.type) res.status(401).send("Não tem nome, status ou tipo")


		tournament.save(tournament, (err, docs) => {
			if (err) res.status(500).send({error: err }).end()

			res.status(200).send(true)
		})
	}


	/********************************
	*    	  UPDATE TORNEIO         *
	********************************/

	let put = (req, res, next) => {
		// get id
		let updateId = mongotypes.ObjectId(req.params.id)
		// Campos a inserir
		// n posso passar _id pq é imutável, portanto nao dá pra fazer new Model()
		let t = Object.assign(req.body.tournament, {}) 

		Model.findOneAndUpdate(
			{ _id: updateId }, // query
			t, // new doc
			{upsert: false},// options
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

module.exports = Tournament()