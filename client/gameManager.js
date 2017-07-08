GameManager = {
	makeGameManager : function()
	{	
		var canvasW = 1536;
		var canvasH = 960;

		var shared = GameManagerShared.makeGameManagerShared();
		var slideWindow = SlideWindow.makeSlideWindow();

		var canvasUi = CanvasUi.makeCanvasUi();
 		canvasUi.setPosition(0, canvasH - canvasUi.position.h);

 		var topPanel = CanvasUi.makeCanvasUi(canvasW, 30);


		var out = {
			autoFocus : true,
			slideWindow : slideWindow,
			lastChosenObject : 0,
			footer : canvasUi,
			topPanel : topPanel,

			getFooter : function()
			{
				return this.footer;
			},

			getTopPanel : function()
			{
				return this.topPanel;
			},

			newTurn: function(playerId)
			{
				var turnPlayer = this.findPlayer(playerId);

				this.turnPlayer = turnPlayer;
				this.currentPlayer = turnPlayer;
				
				turnPlayer.newTurn();
			},
			addServerPlayer : function(json)
			{
				var player = Player.makePlayer(json.name);

				player.load(json);

				this.players[this.players.length] = player;
			},

			setActionCenterNCon: function(object)
			{
				if(object.player && GameEngine.gameManager.getControllPlayer() != object.player)
				{
					this.setActionCenter(object);
				}
			},

			setActionCenter : function(object)
			{
				if(this.autoFocus)
				{
					slideWindow.centerToPosition(object.position.x, object.position.y);
				}
			},

			switchAutoFocus : function()
			{
				if(this.autoFocus)
				{
					this.autoFocus = false;
					return;
				}
				this.autoFocus = true;				
			},

			showPossibleOperations : function(objects)
			{
				if(objects.length > 0)
				{
					var object = objects[this.lastChosenObject % objects.length];
					this.lastChosenObject++;
					slideWindow.centerToPosition(object.position.x, object.position.y);
					Field.canvasUi.setType(object);

					Field.focusObject(object);

					if(object.name == "army")
					{
						if(object.speed > 0)
						{							
							object.showMove();
						}
						else if(object.fights > 0)
						{
							object.showAttack();
						}
					}					
				}
			},

			onKey : function(key)
			{
				slideWindow.onKey(key);

				if(key == "x")
				{
					this.switchAutoFocus();
				}

				if(key == "a")
				{
					var objects = this.getControllPlayer().getPossibleOperation();
					this.showPossibleOperations(objects);
				}
				if(key == "e")
				{
					GameEngine.sendNextTurn();
				}

			}
		};

		var out = Object.assign(shared, out);

		window.addEventListener('keydown', function (evt){
          	out.onKey(evt.key);
  		}, false);

		return out;
	}
};