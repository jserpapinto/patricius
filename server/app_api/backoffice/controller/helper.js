"use strict"

let Helper = () => {

	let responde = (res, status, content) => {
		console.log(content)
		res.status(status)
		res.json(content)
	}

	return {
		responde: responde
	}
}

module.exports = Helper()