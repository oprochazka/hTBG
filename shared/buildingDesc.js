BuildingDesc = {
	barracks : {
		img : "barracks.png",
		productObject : ["soldier", "builder"],
		earnGold : 0,
		cost : 0,
		type : "barracks",
		name : "building"
	},

	castle : {
		img : "castle.png",
		productObject : ["archer"],
		earnGold : 0,
		cost : 0,
		type : "castle",
		name : "building"
	},

	goldMine : {
		img : "goldMine.png",
		productObject : [],
		earnGold : 10,
		cost : 0,
		type : "goldMine",
		name : "building"
	},
	stable : {
		img : "stable.png",
		productObject : ["horseman"],
		earnGold : 0,
		cost : 0,
		type : "stable",
		name : "building"
	},
	wall : {
		img : "wall.png",
		productObject : [],
		earnGold : 0,
		cost : 20,
		type : "wall",
		health : 2,
		border : true,
		name : "building",
		modifyMove : 1000,
		forbidenTiles : ["water"]
	},
	grayve : {
		img : "rip.png",
		productObject : [],
		earnGold : 0,		
		type : "grayve",
		name : "building"	
	}

};