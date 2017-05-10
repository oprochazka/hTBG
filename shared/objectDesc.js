ObjectDesc = {
	getConfiguration : function(type, name)
	{
		var desc = ObjectDesc[name];
		if(desc)
		{
			return desc[type];
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
		}

	},

	army : ArmyDesc,
	building : BuildingDesc	
};