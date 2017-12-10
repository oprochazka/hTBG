Tile = {	
	initModule : function(tileSizeW, tileSizeH)
	{
	
	},

	makeTile : function(tileDescName)
	{		
		var tileSizeW = Field.squareW;
		var tileSizeH = Field.squareH;

		var tileShared = TileShared.makeTileShared(tileDescName);
		var square = Draw.makeSquare(tileSizeW, tileSizeH);

		var oldSetType = tileShared.setType;	

		var tile = {			
			square : square,			
			name : name,			

			getPosition : function()
			{
				return this.position;
			},

			setType : function(armyDescType)
			{				
				var config = oldSetType.call(this, armyDescType);
				
				this.name = config.name;
				this.img = "http://"+ GameEngine.server +"/asets/"+ config.img;

				this.square.setImage(this.img);
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
	        },

	        setDrawPosition: function(x, y)
	        {
	        	this.square.setPosition(x, y);
	        }
		};

		return Object.assign(tileShared, tile);
	}
}

Tile = Object.assign(TileShared, Tile);