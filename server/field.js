Field = {	
	tilesW : null,
	tilesH : null,
	tileField : [],
	x : 0,
	y : 0,
	moveMap : null,

	initModule: function()
	{
		
	},

	makeField : function(w, h)
	{		
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
					case 0: tile = Tile.makeWoodTile(); break;
					case 1: tile = Tile.makeWaterTile(); break;
					case 2: tile = Tile.makeMountainTile(); break;
					case 3: tile = Tile.makeGrassTile(); break;
					case 4: tile = Tile.makeGrassTile(); break;
					case 5: tile = Tile.makeWoodTile(); break;
					default: tile = Tile.makeWoodTile();
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
				var building = Building.makeBarracksTile();
				this.insertObject(building, x1, y1);	
				
			}


			if(Field.getObject(x1,y1)[0].type == "grass" && z == 3)
			{
				var building = Building.makeCastleTile();
				this.insertObject(building, x1, y1);	

				 //castles++;
			}
		}
		
	}
};

var merge = require('merge'), original, cloned;
Field = merge(FieldShared, Field);