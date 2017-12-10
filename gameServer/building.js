Building = {

	makeBuilding : function(image, player)
	{
		var buildingShared = BuildingShared.makeBuildingShared(image, player);

		return buildingShared;	
	}
}