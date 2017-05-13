BuildingDesc = {
	barracks : {
		img : "barracks.png",
		productObject : ["soldier", "builder"],
		earnGold : 0,
		cost : 0,
		type : "barracks",
		name : "building",
		initProductUnits : 1
	},

	castle : {
		img : "castle.png",
		productObject : ["archer"],
		earnGold : 0,
		cost : 0,
		type : "castle",
		name : "building",
		initProductUnits : 1
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
		name : "building",
		initProductUnits : 1
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