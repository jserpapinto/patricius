"use strict"
// Dependências
let mongoose = require("mongoose")
let mongotypes = mongoose.Types	
// Model
let Model = require('../model/team')

// Helper
let H = require('./helper')

// Factory Function
const Team = () => {


	/********************************
	*    GET JSON DE TEAMS        *
	********************************/
	let getAll = (req, res, next) => {
		// Find all
		Model
			.find({})
			.select('name imgs')
			.exec((err, teamList) => {
				// Err -> Bd bad request
				if (err) return H.responde(res, 400, err)

				if (!teamList || teamList === 0) {
					return H.responde(res, 404, {
						"msg": "Não há equipas na bd."
					})
				}

				return H.responde(res, 200, teamList)
			})
	}

	let getOne = (req, res, next) => {
		// Err -> Sem parametros
		if (!req.params || !req.params.teamid) {
			return H.responde(res, 400, {
				"msg": "Pedido sem parametro: teamid."
			})
		}

		// find one
		Model
			.findById(req.params.teamid)
			.exec((err, team) => {
				// handle err
				if (err) return H.responde(res, 400, err)

				return H.responde(res, 200, team)
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