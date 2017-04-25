var merge = require('merge'), original, cloned;

Building = {
	server : "127.0.0.1:8080",

	makeBuilding : function(image, player)
	{
		var buildingTile = Tile.makeTile("building", null);	

		var building = {
			production : 0,			
			player : player,						

	        setPlayer : function( player)
	        {
	        	this.player = player;	        		        		        	
	        },

			newTurn : function(player)
			{

			}		

		};

		return merge(buildingTile, building);			
	},

	makeBarracksTile : function()
	{
		var out = this.makeBuilding();		

		out.type = "barracks";		

		out.productArmy = function()
		{
			var p = GameEngine.findPlayer(out.player);
			var army = Field.getArmyObject(out.position.x, out.position.y);
		 
		
			if(!army)
			{
				p.buildArmy(out.position.x, out.position.y);			
			}
		}

		out.setPlayer = function(player)
		{
			this.player = player;
			setInterval(out.productArmy, 20000);
		}

		return out;	
	},

	makeCastleTile : function()
	{
		var out = this.makeBuilding();		

		out.type = "castle";		

		out.productArmy = function()
		{
			var p = GameEngine.findPlayer(out.player);
			var army = Field.getArmyObject(out.position.x, out.position.y);
		 
		
			if(!army)
			{
				p.buildArcher(out.position.x, out.position.y);			
			}
		}

		out.setPlayer = function(player)
		{
			this.player = player;
			setInterval(out.productArmy, 20000);
		}

		return out;	
	}
}