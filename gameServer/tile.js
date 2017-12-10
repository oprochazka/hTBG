Tile = {
	tileSizeW : 0,
	tileSizeH : 0,

	initModule : function(tileSizeW, tileSizeH)
	{
		this.tileSizeW = tileSizeW;
		this.tileSizeH = tileSizeH;
	},

	makeTile : function(tileDescName)
	{	
		var tileShared = TileShared.makeTileShared(tileDescName)

		tileShared.id = GameEngine.generateId();		

		return tileShared;
	},	
};

Tile = Object.assign(TileShared, Tile);