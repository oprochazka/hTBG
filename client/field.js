Field = {
	squareW : null,
	squareH : null,
	canvas : null, 
	tilesW : null,
	tilesH : null,
	tileField : [],
	x : 0,
	y : 0,
	cursor : null,
	focusedTile : null,
	clickedSquare : null,

	canvas : null,

	moveMap : null,
	rangeMap : null,

	slideWindow : null,

	initModule: function(canvas, squareW, squareH)
	{
		this.squareW = squareW;
		this.squareH = squareH;

		this.canvas = canvas;

		Tile.initModule(this.squareW, this.squareH);

		this.slideWindow = SlideWindow.makeSlideWindow();
	},

	loadField : function(json)
	{
		var fields = json.data;
		this.tilesW = json.tilesW;
		this.tilesH = json.tilesH;		


		for(var i = 0; i < fields.length; i++)
		{
			var objs = fields[i];
			for(var z = 0; z < objs.length; z++)
			{
				var obj = objs[z];

				var tile = null;

				if(obj.name == "tile")
				{					
					tile = Tile.loadTile(obj);
				}				
				if(obj.name == "building")
				{
					tile = Building.loadBuilding(obj);
				}
				if(obj.name == "army")
				{
					tile = Army.loadArmy(obj);
				}

				this.insertObject(tile, obj.position.x, obj.position.y);	
			}
		}
	},

	move : function(x, y)
	{
		this.x += x;
		this.y += y;

		for(var i = 0; i < this.tileField.length; i++)
		{
			for(z = 0; z < field.length; z++)
			{
				this.tileField[i][z].move(x, y);
			}
		}
	},

	render : function()
	{
		Draw.canvas = this.canvas;				
		Draw.clearScreen();

		this.slideWindow.render();

		if(this.cursor)
		{
			this.cursor.render();
		}

		if(this.clickedSquare)
		{
			this.clickedSquare.render();
		}
	},

  	refreshMouse : function(mousePos, evt) {        
    	var xOffset = this.slideWindow.x;
    	var yOffset = this.slideWindow.y;

		if(this.cursor)
		{
			this.removeObject(this.cursor, this.cursor.destX, this.cursor.destY);
		}


		this.cursor = Draw.makeSquare(Field.squareW,Field.squareH);
		this.cursor.setColor("#FF0000");

		var pos = this.indexPosition(mousePos);

		this.cursor.destX = pos.x + xOffset;
		this.cursor.destY = pos.y + yOffset;
		
		this.insertObject(this.cursor, pos.x + xOffset, pos.y + yOffset);
  	},

  	setMoveMap: function(moveMap, rangeMap)
  	{
  		this.clearMoveMap();
  		this.setVisibilityMap(moveMap);
  		this.setRangeMap(rangeMap);
  	},

  	setVisibilityMap: function(mapObj)
  	{ 		
  		Field.moveMap = mapObj;

  		for(var i = 0; i < mapObj.length; i++)
  		{  			
  			var map = mapObj[i];  			
  			var tile = Draw.makeFillSquare(this.squareW, this.squareH);;			

			tile.name = "mapTile";
			Field.insertObject(tile, map.x, map.y);
  		}
  	},

  	setRangeMap: function(mapObj)
  	{
  		Field.rangeMap = mapObj;

  		for(var i = 0; i < mapObj.length; i++)
  		{  			
  			var map = mapObj[i];  			
  			var tile = Draw.makeFillSquare(this.squareW, this.squareH);
  			var playerObj = this.getArmyObject(map.x, map.y);

  			tile.setColor("rgba(10, 110, 10, 0.4)");	

  			if(playerObj && playerObj.player.controll)
  			{
				tile.setColor("rgba(10, 110, 10, 0)");	
			}			
			
			if(playerObj && !playerObj.player.controll )
			{
				tile.setColor("rgba(150, 0, 0, 0.7)");
			}
			tile.name = "mapTile";
			Field.insertObject(tile, map.x, map.y);
  		}
  	},

  	clearMap : function(mapObj)
  	{
		if(!mapObj)
  		{
  			return;
  		}

  		for(var i = 0; i < mapObj.length; i++)
  		{  			
  			var map = mapObj[i];

  			var tile = Field.getObject(map.x, map.y);

  			for(var x = 0; x < tile.length; x++)
  			{  				
  				if(tile[x].name == "mapTile")
  				{
  					Field.removeObject(tile[x], map.x, map.y);
  				}
  			}
  			
  		}
  	},

  	clearMoveMap: function()
	{  				
  		this.clearMap(this.moveMap);
  		this.clearMap(this.rangeMap);

  		this.moveMap = null;
  		this.rangeMap = null;
  	},

  	onClick: function(mousePos, evt, key) {
  		var xOffset = this.slideWindow.x;
    	var yOffset = this.slideWindow.y;

		var position = this.indexPosition(mousePos);
		var posX = position.x;
		var posY = position.y;

		var positionOrigin = {x : position.x, y : position.y};

		position = {x : posX + xOffset, y : posY + yOffset};

		this.clearMoveMap();

		if(this.clickedSquare)
		{
			this.removeObject(this.clickedSquare, this.clickedSquare.destX, this.clickedSquare.destY);
		}


		this.clickedSquare = Draw.makeSquare(Field.squareW,Field.squareH);
		this.clickedSquare.setColor("#FF0F0F");		

		var object = this.getObject(position.x, position.y);

		if(this.focusedTile)
		{
			for(var i = 0; i < this.focusedTile.length; i++)
			{

				var obj = this.focusedTile[i];
				if(obj.lostFocus)
				{
					obj.lostFocus(position, object, key);
				}
			}
		}

		if(object)
		{
			for(var i=0; i < object.length; i++)
			{
				object[i].onClick(position, key);				
			}
		}

		this.focusedTile = object;

		this.clickedSquare.destX = position.x;
		this.clickedSquare.destY = position.y;
		
		this.insertObject(this.clickedSquare, position.x, position.y);
  	},

  	insertObject : function(object, x, y)
  	{  		
  		oldInsertObject.call(this, object, x, y);

  		object.setPosition(x * Field.squareW, y*Field.squareH);	
  	}
};

var oldInsertObject = FieldShared.insertObject;

Field = Object.assign(FieldShared, Field);