// Dependências
let mongoose = require("mongoose")
let db = require("../../db")
// Model
let Model = require("../model/torneios")

// Factory Function
const Torneios = () => {

	/********************************
	*    	 PRIVATE METHODS         *
	********************************/
	let mountTorneio = (req) => {
		return new Model({
			name: req.body.torneio.name,
			img: req.body.torneio.img,
			final: req.body.torneio.final
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
		let torneio = mountTorneio(req)

		// Data validations
		if (!torneio.name || !torneio.img) res.end("Não tem nome ou img")

		// Log
		if (!torneio.final) console.log("Não tem final")

		torneio.save(torneio, (err, docs) => {
			if (err) throw err // ou res.send(500, { error: err }) ?
			res.end("Torneio inserido")
		})
	}

	/********************************
	*    	  UPDATE TORNEIO         *
	********************************/
	let put = (req, res, next) => {
		// Campos a inserir
		// n posso passar _id pq é imutável, portanto nao dá pra fazer new Model()
		let torneio = Object.assign(req.body.torneio, {}) 

		Model.findOneAndUpdate(
			{ name: req.body.unique }, // query
			torneio, // new doc
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

module.exports = Torneios()