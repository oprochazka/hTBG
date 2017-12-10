ObjectDesc = {
	getConfiguration : function(type, name)
	{
		if(name)
		{
			var desc = ObjectDesc[name];
			if(desc)
			{
				return desc[type];
			}
		}
		else
		{
			var out = ArmyDesc[type];
			if(out)
			{
				return out;
			}
			out = BuildingDesc[type]
			if(out)
			{
				return out;
			}
			out = BuilderDesc[type]
			if(out)
			{
				return out;
			}

			out = TilesDesc[type]
			if(out)
			{
				return out;
			}
		}

	},

	getConstructor : function(type)
	{
		var config = this.getConfiguration(type);		

		if(config.name == "army")
		{			
			if(config.productObject && config.productObject.length > 0)
			{			
				return Builder.makeBuilder;
			}

			return Army.makeArmy;		
		}

		if(config.name == "building")
		{
			return Building.makeBuilding;
		}

		if(config.name == "tile")
		{
			return Tile.makeTile;
		}

	},

	army : ArmyDesc,
	building : BuildingDesc,
	builder : BuilderDesc,
	tilesDesc : TilesDesc
};