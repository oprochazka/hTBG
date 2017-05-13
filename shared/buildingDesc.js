BuildingDesc = {
	barracks : {
		img : "barracks.png",
		productObject : ["soldier", "builder"],
		earnGold : 0,
		cost : 80,
		type : "barracks",
		name : "building",
		initProductUnits : 1,
		forbidenTiles : ["water", "swamp", "mountain", "wood"]
	},

	castle : {
		img : "castle.png",
		productObject : ["archer"],
		earnGold : 0,
		cost : 110,
		type : "castle",
		name : "building",
		initProductUnits : 1,
		forbidenTiles : ["water", "swamp", "mountain", "wood"]
	},

	goldMine : {
		img : "goldMine.png",
		productObject : [],
		earnGold : 30,
		cost : 0,
		type : "goldMine",
		name : "building",
		forbidenTiles : ["water", "swamp", "wood", "grass"]
	},

	woodCut : {
		img : "woodCut.png",
		productObject : [],
		earnGold : 10,
		cost : 50,
		type : "woodCut",
		name : "building",
		forbidenTiles : ["grass", "water", "swamp", "mountain"]
	},

	stable : {
		img : "stable.png",
		productObject : ["horseman"],
		earnGold : 0,
		cost : 100,
		type : "stable",
		name : "building",
		initProductUnits : 1,
		forbidenTiles : ["water", "swamp", "mountain", "wood"]
	},
	wall : {
		img : "wall.png",
		productObject : [],
		earnGold : 0,
		cost : 20,
		type : "wall",
		initHealth : 20,
		border : true,
		name : "building",
		modifyMove : 1000,
		forbidenTiles : ["water"]
		
	},
	stepWall : {
		boost : [
			{key : "range", value : 2},
			{key : "water" , value : -2},
			{key : "ship" , value : 1000}

		]
	},
	grayve : {
		img : "rip.png",
		productObject : [],
		earnGold : 0,		
		type : "grayve",
		name : "building"	
	}

};