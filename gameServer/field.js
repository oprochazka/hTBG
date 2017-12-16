Field = {	
	tilesW : null,
	tilesH : null,
	tileField : [],
	x : 0,
	y : 0,
	moveMap : null,

	initModule: function()
	{
		FieldShared.initModule()
	},

	makeFieldByMap : function(w, h, mapArray, objects)
	{
		Field.tileField = [];
		FieldShared.tileField = [];

		console.log(w, h, mapArray.length);
		this.tilesW = w;
		this.tilesH = h;
		Tile.initModule(this.squareW, this.squareH);
		


		for(var i = 0; i < mapArray.length; i++)
		{
			var objs = mapArray[i];
			
			var obj = Tile.makeTile(mapArray[i]);

			var pos = FieldShared.get2DFromIndex(i);

			FieldShared.insertObject(obj, pos.x, pos.y);			
		}

		for(var i = 0; i < objects.length; i++)
		{
			if(objects[i].type == "goldMine")
			{
				var building = Building.makeBuilding();				
				building.setType("goldMine");
				var position = Field.get2DFromIndex(objects[i].position);
				this.insertObject(building, position.x, position.y);				
			}
		}
	},

	makeField : function(w, h)
	{				
		Field.tileField = [];
		FieldShared.tileField = [];

		Tile.initModule(this.squareW, this.squareH);

		this.tilesW = w;
		this.tilesH = h;
		var castles = 0;
		var barracks = 0;
		for( var y = 0; y < h; y++)
		{
			for(var x = 0; x < w; x++)
			{
				var rand = Math.floor((Math.random() * 10) + 1)%6;
				var tile = null;
				switch(rand)
				{
					case 0: tile = Tile.makeTile("wood"); break;
					case 1: tile = Tile.makeTile("water"); break;
					case 2: tile = Tile.makeTile("mountain"); break;
					case 3: tile = Tile.makeTile("grass"); break;
					case 4: tile = Tile.makeTile("grass"); break;
					case 5: tile = Tile.makeTile("wood"); break;
					default: tile = Tile.makeTile("wood");
				}	
				
				Field.insertObject(tile, x, y);
			}
		}

		for(var i = 0; i < 10; i++)
		{
			var x1 = Math.floor((Math.random() * 24));
			var y1 = Math.floor((Math.random() * 15));
			var z = Math.floor((Math.random() * 4));
			
			if(Field.getObject(x1,y1)[0].type != "water" && z != 3)
			{
				var building = Building.makeBuilding("barracks");
				this.insertObject(building, x1, y1);					
			}


			if(Field.getObject(x1,y1)[0].type == "grass" && z == 3)
			{
				var building = Building.makeBuilding("castle");
				this.insertObject(building, x1, y1);				
			}						
		}

		for(var i = 0; i < 100; i++)
		{
			var x1 = Math.floor((Math.random() * 24));
			var y1 = Math.floor((Math.random() * 15));
			var z = Math.floor((Math.random() * 4));
		
			if(Field.getObject(x1,y1)[0].type == "mountain" && z != 3)
			{
				if(Field.getObject(x1,y1).length == 1)
				{
					var building = Building.makeBuilding("goldMine");				
					this.insertObject(building, x1, y1);				
				}
			}
		}

	}
};

Field = Object.assign(FieldShared, Field);