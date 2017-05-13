GameManager = {
	makeGameManager : function()
	{	
		var shared = GameManagerShared.makeGameManagerShared();

		var out = {
		

		};

		return Object.assign(shared, out);
	}
};