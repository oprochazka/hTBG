FieldShared = {	
	tilesW : null,
	tilesH : null,
	tileField : [],
	x : 0,
	y : 0,

	getObject: function(x, y)
	{
		var index = (y * this.tilesW) + x;
		var field = this.tileField[index];

		return field;
	},

	insertObject: function(object, x, y)
	{
		var index = (y * this.tilesW) + x;

		var field = this.tileField[index];		

		if(!field)
		{
			this.tileField[index] = [];
			field = this.tileField[index];
		}


		field[field.length] = object;

		object.setPosition(x, y);	
	},

	removeObject: function(object, x, y)
	{
		var index = (y * this.tilesW) + x;

		var field = this.tileField[index];


		if(!field)
		{
			return;
		}

		for(var i = 0; i < field.length; i++)
		{
			if(object == field[i])
			{
				field.splice(i, 1);
			}
		}
	},
	
	insertTile: function(tile, x ,y)
	{
		var index = (y * this.tilesW) + x;

		var field = this.tileField[index];		

		if(!field)
		{
			this.tileField[index] = [];
			field = this.tileField[index];
		}


		field[0] = tile;

		object.setPosition(x * Field.squareW, y*Field.squareH);	
	},

  	indexPosition: function(mousePos)
  	{
  		var nX = Math.floor(mousePos.x/Field.squareW);
  		var nY = Math.floor(mousePos.y/Field.squareH);
		
		return {x : nX, y : nY}; 		
  	},

  	drawPosition: function(x, y)
  	{
  		var nX = Math.floor(x * Field.squareW);
  		var nY = Math.floor(y * Field.squareH);
		
		return {x : nX, y : nY}; 		
  	},

  	getPlayerObject : function(x, y)
  	{
  		var objects = Field.getObject(x,y);
  		var out = [];
		for(var x = 0; x < objects.length; x++)
		{			
			if(objects[x].player)
			{
				out[out.length] = object[x];
			}				
		}
		return out;
  	},

  	getArmyObject: function(x, y)
  	{
		var objects = Field.getObject(x,y);

		if(!objects)
		{
			return;
		}

		for(var x = 0; x < objects.length; x++)
		{			
			if(objects[x].name == "army" || objects[x].name == "builder")
			{
				return objects[x];
			}				
		}
		return null;
  	},

  	getBuildingObject: function(x, y)
  	{
  		var objects = Field.getObject(x,y);

		for(var x = 0; x < objects.length; x++)
		{			
			if(objects[x].name == "building")
			{
				return objects[x];
			}				
		}
		return null;
  	},

  	findById: function(id)
	{
		for(var i = 0; i < this.tileField.length; i++)
		{
			var objs = this.tileField[i];

			if(!objs)
			{
				continue;
			}
			for(var z = 0; z < objs.length; z++)
			{
				if(objs[z].id == id)
				{
					return objs[z];
				}
			}
		}
	},

  	getIndexBy2D: function(x, y)
	{
		return (y * this.tilesW) + x;
	},	

	get2DFromIndex: function(index)
	{
		return {x : index%this.tilesW, y : Math.floor(index/this.tilesW)};
	},

	dumpField : function()
	{		
		var data = [];

		for(var i = 0; i < this.tileField.length; i++)
		{
			var objs = this.tileField[i];
			data[data.length] = [];
			for(var z = 0; z < objs.length; z++)
			{
				data[i][z] = objs[z].dump();
			}
		}

		var dumped = {type : "field", tilesW : this.tilesW, tilesH : this.tilesH, data : data};

		return dumped;
	}

}