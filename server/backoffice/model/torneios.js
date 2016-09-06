// Dependências
let mongoose = require("mongoose")
let Schema = mongoose.Schema

//Model
const TorneioShema = new Schema({
	name: { 
		type: String, 
		index: { 
			unique: true 
		}
	}, // tipo + ano
	img: [{
		src: String,
		order: Number
	}], // array de objectos {src: 'path/to/file.jpg', order: Number}
	final: {
		winner: {
			name: String,
			goals: Number,
			penalties: Number
		},
		runnerup: {
			name: String,
			goals: Number,
			penalties: Number
		}
	}
}, {collection: "torneios"})

let Torneio = mongoose.model("torneios", TorneioShema)

module.exports = Torneio