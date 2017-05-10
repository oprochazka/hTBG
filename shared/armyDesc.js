ArmyDesc ={
	soldier : {
		img : "soldier.png",
		type : "soldier",
		cost : 20,
		initHealth : 2,
		powerAttack : 2,
		range : 1,
		speed : 3,
		initSpeed : 3,
		initFights : 2,
		name : "army"
	},

	archer : {
		img : "archer.png",
		type : "archer",
		cost : 50,
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
		name : "army"
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
		name : "army"
	},

	builder : {
		img : "builder.png",
		type : "builder",
		productObject : ["wall", "stable", "horseman"],
		cost : 50,
		initHealth : 1,
		powerAttack : 1,
		range : 1,
		speed : 4,
		initSpeed : 4,
		initFights : 1,
		name : "army"
	}
};