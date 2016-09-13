"use strict"
// Dependências
let mongoose = require("mongoose")
let db = require("../../db")
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
	*    GET JSON DE TORNEIOS        *
	********************************/
	let get = (req, res, next) => {
	}

	/********************************
	*      INSERIR NOVO TORNEIO      *
	********************************/
	let post = (req, res, next) => {
	}

	/********************************
	*    	  UPDATE TORNEIO         *
	********************************/
	let put = (req, res, next) => {
	}

	/********************************
	*    	  DELETE TORNEIO         *
	********************************/
	let del = (req, res, next) => {
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

module.exports = Team()