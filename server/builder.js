Builder = {
	makeBuilder : function(armyDescType)
	{
		var builderShared = BuilderShared.makeBuilderShared(armyDescType);

		var out = {
			
		};

		return Object.assign(builderShared, out);
	}
};