// Dependências
let express = require('express')
let router = express.Router()

// Controllers
let tournament = require("../backoffice/controller/tournament")

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('Admin landing page')
})


/********************************
*    	 	DASHBOARD        	 *
*	- 
*	- 
*	- 
********************************/
//router.get("/", dahsboard.get)


	/********************************
	*    	 DASHBOARD - MENU        *
	*	- get types of tournament
	********************************/


/********************************
*    	 TOURNAMENT - CREATE / EDIT 
*	- tipo
*	- date
*	- add teams
*		- get all teams
*	- remove team
*	- imgs 
*		- get all imgs
*		- upload imgs
*		- delete imgs
*		- mark profile img
*
*	EDIT:
*	- get arenas from tournament
*	- delete current tournament
*	- get date of tournament
*	- get all teams from tournament
*	- get all imgs
********************************/

/********************************
*    	 TOURNAMENT - HOME
*	- get last tournament from type selected
*	- get a list of names of all the past and future tournaments
*	from the date of current tournament
*	- get list of arenas 
*	- edit tournament -> edit page
*	- add game (popup)
*	- list games 
*		- past games ordered from today to past
*			- edit
*				- teams
*					- get all teams
*				- date
*				- arena
*					- get all arenas
*			- delete game
*			- start game OR restart game (if with status true) -> start page
*		- future games ordered from today to future
*			- edit
*				- teams
*					- get all teams
*				- date
*				- arena
*					- get all arenas
*			- delete game
********************************/
router.get("/torneio", tournament.get) //faltam as routes individuais de torneio
router.post("/torneio", tournament.post)
router.put("/torneio", tournament.put)
router.delete("/torneio", tournament.delete)

	/********************************
	*    	 START GAME
	*	- get current tournament
	*	- get date
	*	- get arena
	*	- get teams
	*	- insert referee
	*		- get all referees
	*	- insert referee points
	*	- insert coach
	*		- get all coaches from team
	*	- insert delegate
	*		- get all delegates from team
	*	- get all active players from teams
	*	- add MVP
	*
	*    	 RESTART GAME
	*	- get coaches
	*	- get delegates
	*	- get referee
	*	- get all events from players
	*	- get MVP
	********************************/
	router.get("/torneio/jogos", tournament.get)
	router.post("/torneio", tournament.post)
	router.put("/torneio", tournament.put)
	router.delete("/torneio", tournament.delete)



/********************************
*    	 TEAMS
*	- list teams
*	- 
*	- 
*	- 
********************************/



/********************************
*    	 PLAYERS
*	- list players
*	- 
*	- 
*	- 
********************************/

// Outros (Treinadores/Delegados/Árbitros)

// Eventos

// Avisos para homepage

module.exports = router
