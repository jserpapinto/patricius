"use strict"
// Dependências
let mongoose = require("mongoose")
let mongotypes = mongoose.Types	
let moment = require("moment")
let path = require("path")
// Model
let Model = require('../model/tournament')

// Helper
let H = require('./helper')

// Date configs
moment.locale('pt-PT');

// Factory Function
const Tournament = () => {

	/********************************
	*    	 PRIVATE METHODS         *
	********************************/

	/********************************
	*    GET JSON DE TOURNAMENTS        *
	********************************/
	let getAll = (req, res, next) => {
		// Find all
		Model
			.find({})
			.select('status name type imgs')
			.exec((err, tournamentList) => {
				// Err -> Bd bad request
				if (err) return H.responde(res, 400, err)

				//Err -> Não há torneios na db
				if (!tournamentList || tournamentList.length === 0) {
					return H.responde(res, 404, {
						"msg": "Não há torneios na bd."
					})
				}

				return H.responde(res, 200, tournamentList)
			})
	}

	let getOne = (req, res, next) => {
		// Err -> Sem parametros
		if (!req.params || !req.params.tournamentid) {
			return H.responde(res, 400, {
				"msg": "Pedido sem parametro: touranmentid."
			})
		}

		// find one
		Model
			.findById(req.params.tournamentid)
			.exec((err, torneio) => {
				// handle err
				if (err) return H.responde(res, 400, err)

				return H.responde(res, 200, torneio)
			})
	}

	/********************************
	*      INSERIR NOVO TOURNAMENT      *
	********************************/
	let post = (req, res, next) => {

		// constroi novo modelo para inserir
		let mountTournament = (t) => { // t = tournament

			// handle img
			let match = /^data:image\/(jpeg|png);base64,/.exec(t.img.content)
			console.log(match[1],"oiiiiiiiiiiiiiii")
			let base64Img = t.img.content.replace(/^data:image\/(jpg|png);base64,/, "")
			let imgName = moment().format() + "." + match[1]
			require("fs").writeFile(path.join(__dirname, "../../../public/imgs/players/" + imgName), base64Img, 'base64', function(err) {
			  console.log(err, "<--- ERRO ");
			});

			return new Model({
				status: t.status || null,
				name: t.name || null,
				type: t.type || null,
				date: moment(t.date) || new Date(), // poe data em iso
				teams: t.teams || [],
				games: t.games || [],
				created_at: new Date()
			})	
		}
		// Campos a inserir
			//console.log(req.body)
		let tournament = mountTournament(req.body.tournament)

		// Data validations
		//if (!tournament.name || !tournament.status || !tournament.type) res.status(401).send("Não tem nome, status ou tipo")

		tournament.save(tournament, (err, doc) => {

			if (err) return res.status(500).send({error: err }).end()

			res.status(200).send({"id": doc._id.toString()})
		})
	}
	let postManyImgs = (req, res, next) => {

	}
	/********************************
	*    	  UPDATE TOURNAMENT         *
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
				res.end("TOURNAMENT atualizado")
			}
		)
	}

	let putImg = (req, res, next) => {
		console.log(req.file.filename)
		let tournamentId = re.params.id
		Model.findOneAndUpdate({_id: tournamentID}, (err, doc) => {
			// push img filename to db imgs[]
		})

		res.status(200)
		res.send("http://192.168.1.66:3000/imgs/tournaments/" + req.file.filename)
		res.end()
	}
	/********************************
	*    	  DELETE TOURNAMENT         *
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
		putImg: putImg,
		put: put,
		delete: del
	}

}

module.exports = Tournament()