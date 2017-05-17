ArmyDesc ={
	soldier : {
		img : "soldier.png",
		type : "soldier",
		cost : 30,
		initHealth : 2,
		powerAttack : 2,
		range : 1,
		speed : 4,
		initSpeed : 3,
		initFights : 2,
		name : "army"
	},

	archer : {
		img : "archer.png",
		type : "archer",
		cost : 60,
		initHealth : 1,
		powerAttack : 3,
		range : 6,
		speed : 6,
		initSpeed : 6,
		initFights : 1,
		name : "army"
	},

	king : {
		img : "king.png",
		type : "king",
		cost : 0,
		initHealth : 8,
		powerAttack : 4,
		range : 1,
		speed : 3,
		initSpeed : 3,
		initFights : 4,
		name : "army",		
	},

	horseman : {
		img : "horseman.png",
		type : "horseman",
		cost : 60,
		initHealth : 2,
		powerAttack : 1,
		range : 1,
		speed : 10,
		initSpeed : 10,
		initFights : 1,
		name : "army",
		modificators : [
			{type: "water", move: 1000}
		]
	},

	ship : {
		img : "ship.png",
		type : "ship",
		cost : 100,
		initHealth : 4,
		powerAttack : 3,
		range : 10,
		speed : 10,
		initSpeed : 15,
		initFights : 1,
		buildAttack : 5,
		name : "army",
		modificators : [
			{type: "grass", move: 1000},
			{type: "wood", move: 1000},
			{type: "mountain", move: 1000}			
		],
		forbidenTiles : ["grass", "wood", "mountain"]
	},

	builder : {
		img : "builder.png",
		type : "builder",
		productObject : ["wall", "stable", "ship", "ram", "woodCut", "castle", "barracks"],
		cost : 50,
		initHealth : 1,
		powerAttack : 1,
		range : 1,
		speed : 4,
		initSpeed : 4,
		initFights : 1,
		initBuilds : 1,
		name : "army"
	},

	ram : {
		type : "ram",
		name : "army",
		img : "ram.png",
		cost : 40,
		initHealth : 3,
		powerAttack : 1,
		buildAttack : 5,
		range : 1,
		speed : 4,
		initSpeed : 4,
		initFights : 1		
	}
};