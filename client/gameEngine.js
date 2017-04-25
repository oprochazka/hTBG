GameEngine = {
	Players : [],
	ip : "192.168.0.3",
	port : "8080",
	server : null,
	yourName : null,
	controllPlayer : null,

	startGame : function(json)
	{
		this.server = this.ip+ ":" +this.port;

		Field.loadField(json);
		

		/*var player1 = Player.makePlayer("WTFAK");

		player1.buildArmy(1,1);
		player1.buildArmy(1,2);
		player1.setControll(true);

		var player2 = Player.makePlayer("Blbak");

		player2.buildArmy(5,5);
		player2.setControll(false);*/
	},

	getControllPlayer : function()
	{
		for(var i = 0; i < this.Players.length; i++)
		{
			if(this.Players[i].controll)
			{
				return this.Players[i];
			}
		}
	},

	findPlayer : function(id)
	{
		for(var i = 0; i < this.Players.length; i++)
		{
			if(this.Players[i].id == id)
			{
				return this.Players[i];
			}
		}
	},

	addPlayer : function(name, password)
	{			

		var msg = {type : "startPlayer", name : name, password : password};

		Client.sendMessage(JSON.stringify(msg));
	},

	addServerPlayer : function(json)
	{
		
		var player = Player.makePlayer(json.name);

		player.load(json);

		this.Players[this.Players.length] = player;
	},


	loadPlayers : function(json)
	{	
		

		for(var i = 0; i < json.length; i++)
		{
			var obj = json[i];

			var player = Player.makePlayer(obj.name);

			player.load(obj);

			this.Players[this.Players.length] = player;			
		}			

	}

}