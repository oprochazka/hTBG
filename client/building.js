Building = {

	makeBuilding : function(image, player)
	{
		var buildingTile = Tile.makeTile("building", null);
		var oldRender = buildingTile.render;
		var square = Draw.makeFillSquare(20, 20);

		buildingTile.square.setImage(image);	

		var building =  {
			id : 0,
			production : 0,			
			player : player,				

			render : function()
			{
				oldRender.call(this);				

				square.setPosition(buildingTile.square.x, buildingTile.square.y);

				if(this.player)
				{
					square.setColor(this.player.color);
					square.render();
				}				
			},				

	        setPlayer : function( player)
	        {
	        	this.player = player;	        	
	        },	       

			load: function(json)
			{
				this.id = json.id;

				if(json.player)
				{					
					this.player = GameEngine.findPlayer(json.player);
					this.player.addBuilding(this);
				}
			}
		};

		return Object.assign(buildingTile, building);		
	},

	makeBarracksTile : function()
	{
		var out = this.makeBuilding("http://"+ GameEngine.server +"/asets/barracks.png");		

		out.type = "barracks";

		return out;	
	},

	makeCastleTile : function()
	{
		var out = this.makeBuilding("http://"+ GameEngine.server +"/asets/castle.png");		

		out.type = "castle";

		return out;	
	},

	loadBuilding : function(json)
	{
		if(json.type == "barracks")
		{
			var building = this.makeBarracksTile();
			building.load(json);				

			return building;
		}
		if(json.type == "castle")
		{
			var building = this.makeCastleTile();
			building.load(json);				

			return building;
		}
	}
}