"use strict"
// Dependências
let express = require('express')
let router = express.Router()
let multer = require("multer")
let path = require("path")

// Controllers
let tournament = require("../backoffice/controller/tournament")
let team = require("../backoffice/controller/team")
let player = require("../backoffice/controller/player")
let game = require("../backoffice/controller/game")

/* GET users listing. */
router.get('/', (req, res) => {
	/* Controller Dashboard */
  res.send('Admin landing page')
})



/**************
*	Tournaments
***************/
router.get("/tournament", tournament.getAll) // regex pra plural
router.get("/tournament/:tournamentid", tournament.getOne) // traz jogos pralem da tralha toda
router.put("/tournament/upload", tournament.putImg)
router.post("/tournament", tournament.post)
router.put("/tournament/:tournamentid", tournament.put)
router.delete("/tournament/:tournamentid", tournament.delete)

/**************
*	Games
***************/
router.get('/tournament/:tournamentid/game/', game.getAllFromTournament)
router.get('/tournament/:tournamentid/game/:gameid', game.getOne)


/**************
*	Teams
***************/
router.get("/team", team.getAll)
router.get("/team/:teamid", team.getOne)
router.post("/team", team.post)
router.put("/team/:teamid", team.put)
router.delete("/team/:teamid", team.delete)



/**************
*	Players
***************/
router.get("/player", player.getAll)
router.get("/player/:playerid", player.getOne)
router.post("/player", player.post)
router.put("/player/:playerid", player.put)
router.delete("/player/:playerid", player.delete)
/********************************
*    	  	   MENU		        *
*	- Tournament
*		-get types of tournament
*	- Teams
*	- Players
********************************/

/********************************
*    	 	DASHBOARD        	 *
*	- 
*	- 
*	- 
********************************/
//router.get("/", dahsboard.get)



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

	/*router.get("/tournament/:idTournament/:idGame", game.getOne)
	router.post("/tournament/:idTournament/createGame", tournament.post)
	router.put("/tournament/:idTournament/:idGame", tournament.put)
	router.delete("/tournament/:idTournament/:idGame", tournament.delete)*/




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
