TileShared = { 
	_setConfiguration : function(tile, tileConfig)
	{
		tile.configuration = tileConfig;
	},

	makeTileShared : function(tileDescName)
	{	
		var configuration = {
			movement : 1,
			fire : 0,
			defend : 0,
			range : 4		
		}		

		var output = {				
			configuration : configuration,
			name : "tile",
			position : {x : 0, y : 0},
			type : null,

			setType: function(tileDescName)
			{				
				var config = TilesDesc[tileDescName];
				TileShared._setConfiguration(this, config);
				this.type = config.type;

				return config;
			},

			insert : function(x, y)
			{		
				if((this.position.x || this.position.x == 0) && (this.position.y || this.position.y == 0))
				{
					Field.removeObject(this, this.position.x, this.position.y);					
				}

				this.position.x = x;
				this.position.y = y;

				Field.insertObject(this, x, y);		
			},
			
			setMovement : function(movement)
			{
				this.configuration.movement = movement;
			},
			setFire : function(fire)
			{
				this.configuration.fire = fire;
			},
			setDefend : function(defend)
			{
				this.configuration.defend = defend;
			},
			
			move : function(x, y)
			{
				
			},
		  	setPosition : function (x,y)
	        {
	          	this.position.x = x;
				this.position.y = y;
	        },

	        load : function(json)
	        {
	        	this.id = json.id;
	        	this.position = json.position;
	        	this.type = json.type;
	        	this.name = json.name;
	        	

	        	this.setType(json.type);
	        },

	        dump : function()
	        {
	        	var dumped = {
	        		configuration : this.configuration,
	        		name : this.name,
	        		position : this.position,
	        		type : this.type
	        	};

	        	return dumped;
	        }
		};

		if(tileDescName)
		{
			output.setType(tileDescName);
		}

		return output;
	},

	loadTile : function(json)
	{
		var tile = null;

		tile = Tile.makeTile();
		tile.load(json);

		return tile;
	}
};