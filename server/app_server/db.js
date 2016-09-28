"use strict"
// Dependências
let mongoose = require("mongoose")

// Connection
let dbURI = 'mongodb://patricius:password@ds019766.mlab.com:19766/patricius_db'
mongoose.connect(dbURI)

// connection logs
mongoose.connection.on('connected', () => {
	console.log('Mongoose connected to',dbURI)
})
mongoose.connection.on('error', (err) => {
	console.log('Mongoose connection error:',err)
})
mongoose.connection.on('disconnected', () => {
	console.log('Mongoose disconnected')
})