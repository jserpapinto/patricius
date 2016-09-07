// Dependências
let express = require('express')
let router = express.Router()

// Controllers
let tournament = require("../backoffice/controller/tournament")

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('Admin landing page')
})

// Dashboard
//router.get("/", dahsboard.get)

// Torneios
router.get("/torneio", tournament.get) //faltam as routes individuais de torneio
router.post("/torneio", tournament.post)
router.put("/torneio", tournament.put)
router.delete("/torneio", tournament.delete)

// Jogos
router.get("/torneio/jogos", tournament.get)
router.post("/torneio", tournament.post)
router.put("/torneio", tournament.put)
router.delete("/torneio", tournament.delete)

// Equipas

// Jogadores

// Outros (Treinadores/Delegados/Árbitros)

// Eventos

// Avisos para homepage

module.exports = router
