// Dependências
let express = require('express')
let router = express.Router()

// Controllers
let torneios = require("../backoffice/controller/torneios")

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('Admin landing page')
})

// Dashboard
//router.get("/", dahsboard.get)

// Torneios
router.get("/torneios", torneios.get) //faltam as routes individuais de torneio
router.post("/torneios", torneios.post)
router.put("/torneios", torneios.put)
router.delete("/torneios", torneios.delete)

// Jogos
router.get("/torneios/jogos", torneios.get)
router.post("/torneios", torneios.post)
router.put("/torneios", torneios.put)
router.delete("/torneios", torneios.delete)

// Equipas

// Jogadores

// Outros (Treinadores/Delegados/Árbitros)

// Eventos

// Avisos para homepage

module.exports = router
