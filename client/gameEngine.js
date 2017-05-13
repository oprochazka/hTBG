GameEngine = {
	Players : [],
	ip : Configure.ip,
	port : Configure.port,
	server : null,
	yourName : null,	
	allMove : false,	
	gameManager : null,
	flagEnd : false,

	initModule : function()
	{
		this.gameManager = GameManager.makeGameManager();
		this.server = this.ip+ ":" +this.port;
	},

	startGame : function(json)
	{	
		Field.loadField(json);
	},

	sendNextTurn: function()
	{
		var player = this.gameManager.getControllPlayer();
		player.inTurn = false;
		Client.sendActionMessage({type : "nextTurn", player : player.id}, player);
	},

	newTurn: function(playerId)
	{
		this.gameManager.newTurn(playerId);
	},

	endGame : function()
	{
		this.flagEnd = CanvasUi.makeEndGame();
	},

	addPlayer : function(name, password)
	{			

		var msg = {type : "startPlayer", name : name, password : password};

		Client.sendMessage(msg);
	},

	addServerPlayer : function(json)
	{
		this.gameManager.addServerPlayer(json);
	}
}
