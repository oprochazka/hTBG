BuildingDesc = {
	barracks : {
		img : "barracks.png",
		type : "barracks",
		name : "building",
		productObject : ["soldier", "builder"],
		earnGold : 0,
		cost : 80,
		initProductUnits : 1,
		initHealth : 5,
		forbidenTiles : ["water", "swamp", "mountain", "wood"]
	},

	castle : {
		img : "castle.png",
		type : "castle",
		name : "building",
		productObject : ["archer"],
		earnGold : 0,
		cost : 110,
		initProductUnits : 1,
		initHealth : 10,
		forbidenTiles : ["water", "swamp", "mountain", "wood"]
	},

	goldMine : {
		img : "goldMine.png",
		type : "goldMine",
		name : "building",
		productObject : [],
		earnGold : 30,
		cost : 0,
		forbidenTiles : ["water", "swamp", "wood", "grass"]
	},

	woodCut : {
		img : "woodCut.png",
		type : "woodCut",
		name : "building",
		productObject : [],
		earnGold : 10,
		cost : 50,
		initHealth : 5,
		forbidenTiles : ["grass", "water", "swamp", "mountain"]
	},

	stable : {
		img : "stable.png",
		type : "stable",
		name : "building",
		productObject : ["horseman"],
		earnGold : 0,
		cost : 100,
		initHealth : 10,
		initProductUnits : 1,
		forbidenTiles : ["water", "swamp", "mountain", "wood"]
	},
	wall : {
		img : "wall.png",
		type : "wall",
		name : "building",
		productObject : [],
		earnGold : 0,
		cost : 20,		
		initHealth : 20,
		border : true,		
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