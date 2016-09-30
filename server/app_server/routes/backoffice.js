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

/* GET users listing. */
router.get('/', (req, res) => {
	/* Controller Dashboard */
  res.send('Admin landing page')
})



/**************
*	Tournaments
***************/
router.get("/tournaments", tournament.getAll) // regex pra plural
router.get("/tournament/:id", tournament.getOne) // traz jogos pralem da tralha toda


// upload img tournament
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/imgs/tournaments/'))
        console.log(file)
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});
var upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, cb) {
	    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { //
	       return cb(new Error('Only image files are allowed!'));
	    }
	    cb(null, true);
  	}
}).single('img') // field name from frontend
// route
router.put("/tournament/upload", tournament.putImg)
// .upload img tournament

router.post("/tournament", tournament.post)

router.put("/tournament/:id", upload, tournament.put)
router.delete("/tournament/:id", tournament.delete)



/**************
*	Teams
***************/
router.get("/teams", team.getAll)
router.get("/team/:id", team.getOne)
router.post("/team", team.post)
router.put("/team/:id", team.put)
router.delete("/team/:id", team.delete)



/**************
*	Players
***************/

// upload img tournament
var storage2 = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/imgs/players/'))
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});
var upload2 = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, cb) {
	    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { //
	       return cb(new Error('Only image files are allowed!'));
	    }
	    cb(null, true);
  	}
}).single('img') // field name from frontend
router.get("/players", player.getAll)
router.get("/player/:id", player.getOne)
router.post("/player", upload2, player.post)
router.put("/player/:id", player.put)
router.delete("/player/:id", player.delete)

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
