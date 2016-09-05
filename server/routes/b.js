// Dependências
let express = require('express')
let router = express.Router()

// Controllers
let torneios = require("../b/controller/torneios")

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('Admin landing page')
})

// Torneios
router.get("/torneios", torneios.get)
router.post("/torneios", torneios.post)
router.put("/torneios", torneios.put)
router.delete("/torneios", torneios.delete)

module.exports = router
