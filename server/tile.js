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
		var tileShared = TileShared.makeTileShared(name, img)

		tileShared.id = GameEngine.generateId();

		return tileShared;
	},

	makeWoodTile : function()
	{
		var out = this.makeTile("tile", null);
		
		out.type = "wood";

		out.setMovement(2);

		return out;
	},

	makeWaterTile : function()
	{
		var out = this.makeTile("tile", null);	

		out.type = "water";

		out.setMovement(3);

		return out;
	},

	makeGrassTile : function()
	{
		var out = this.makeTile("tile", null);		

		out.type = "grass";

		out.setMovement(1);

		return out;
	},

	makeMountainTile : function()
	{
		var out = this.makeTile("tile", null);
		out.setMovement(2);

		out.type = "mountain";

		return out;
	}
};

var merge = require('merge'), original, cloned;
Tile = merge(TileShared, Tile);