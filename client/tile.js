Tile = {
	tileSizeW : 0,
	tileSizeH : 0,

	initModule : function(tileSizeW, tileSizeH)
	{
		this.tileSizeW = tileSizeW;
		this.tileSizeH = tileSizeH;
	},

	makeTile : function(name, img)
	{		
		var tileShared = TileShared.makeTileShared(name, img);
		var square = Draw.makeSquare(this.tileSizeW, this.tileSizeH)		

		var tile = {			
			square : square,			
			name : name,

			getPosition : function()
			{
				return this.position;
			},

			onClick : function(pos, key)
			{
				if(key == "left")
				{
					this.square.onClick(pos);
				}
			},
			onMouseMove : function(pos)
			{
				this.square.onMouseMove(pos);
			},
		
			render : function()
			{
				this.square.render();
			},
			move : function(x, y)
			{
				this.square.move(x, y)
			},
		  	setPosition : function (x,y)
	        {
	          this.square.setPosition(x, y)
	        }        
		};

		return Object.assign(tileShared, tile);
	},

	makeWoodTile : function()
	{
		var out = this.makeTile("wood", null);

		out.square.setImage("http://"+ GameEngine.server +"/asets/wood.png");	

		out.type = "wood";	
		out.setMovement(2);

		return out;
	},

	makeWaterTile : function()
	{
		var out = this.makeTile("tile", null);

		out.square.setImage("http://"+ GameEngine.server +"/asets/water.png");	

		out.type = "water";	
		out.setMovement(3);

		return out;
	},

	makeGrassTile : function()
	{
		var out = this.makeTile("tile", null);

		out.square.setImage("http://"+ GameEngine.server +"/asets/grass.png");	

		out.type = "grass";	
		out.setMovement(1);

		return out;
	},

	makeMountainTile : function()
	{
		var out = this.makeTile("tile", null);
		out.setMovement(2);
		out.type = "mountain";	

		out.square.setImage("http://"+ GameEngine.server +"/asets/mountain.png");	

		return out;
	},

	loadTile : function(json)
	{
		var tile = null;
		if(json.type == "water")
		{
			tile = this.makeWaterTile();
		}
		if(json.type == "wood")
		{
			tile = this.makeWoodTile();
		}
		if(json.type == "grass")
		{
			tile = this.makeGrassTile();
		}
		if(json.type == "mountain")
		{
			tile = this.makeMountainTile();
		}

		tile.load(json);

		return tile;
	}
}

Tile = Object.assign(TileShared, Tile);