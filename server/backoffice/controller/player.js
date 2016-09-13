"use strict"
// Dependências
let mongoose = require("mongoose")
let db = require("../../db")
// Model
let Model = require("../model/player")

// Factory Function
const Player = () => {

	/********************************
	*    	 PRIVATE METHODS         *
	********************************/
	let mountPlayer = (equipa) => {
	}

	/********************************
	*    GET JSON DE JOGADORE        *
	********************************/
	let get = (req, res, next) => {
	}

	/********************************
	*      INSERIR NOVO JOGADOR      *
	********************************/
	let post = (req, res, next) => {
	}

	/********************************
	*    	  UPDATE JOGADOR         *
	********************************/
	let put = (req, res, next) => {
	}

	/********************************
	*    	  DELETE JOGADOR         *
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

module.exports = Player()