PlayerEntity = {
	makePlayerEntity : function()
	{
		var playerEntityShared = PlayerEntityShared.makePlayerEntityShared();

		var out = {

		};

		return Object.assign(playerEntityShared, out);
	}
};