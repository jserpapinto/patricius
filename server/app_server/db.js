"use strict"
// Dependências
let mongoose = require("mongoose")

// Connection
let dbURI = 'mongodb://localhost/patricius'; //'mongodb://patricius:password@ds019766.mlab.com:19766/patricius_db'
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

const gracefulShutdown = (msg, callback) => {
	mongoose.connection.close(() => {
		console.log('Mongoose disconnected through',msg)
		callback()
	})
}

// connection shutdowns and restarts
process.once('SIGUSR2', () => {
	gracefulShutdown('nodemon restart', () => {
		process.kill(process.pid, 'SIGUSR2')
	})
})
process.on('SIGINT', () => {
	gracefulShutdown('app termination', () => {
		process.exit(0)
	})
})
process.on('SIGTERM', () => {
	gracefulShutdown('Heroku app shutdown', () => {
		process.exit(0)
	})
})