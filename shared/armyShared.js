ArmyShared = {
	compare : function(x, y, moveMap)
	{	
		var t = Field.getObject(x, y);

		if(!t)
		{
			return;					
		}
		t = t[0];
		var mov = t.configuration.movement;
		var speed = 0;
		for(var i = 0; i < moveMap.length; i++)
		{
			map = moveMap[i];

			if(Math.abs(map.x-x) == 1 && map.y-y == 0)
			{
				if( map.speed > speed )
				{
					speed = map.speed;
				}
			}
			if(map.x-x == 0 && Math.abs(map.y-y) == 1)
			{
				if( map.speed > speed )
				{
					speed = map.speed;
				}	
			}
		}

		var o = speed - mov;

		if(o < 0)
		{
			return false;
		}
		var map = {x : x, y : y, speed : o};
		for(var i = 0; i < moveMap.length; i++)
		{
			if(moveMap[i].x == map.x && moveMap[i].y == map.y)
			{
				if(map.speed <= moveMap[i].speed)
				{
					return;
				}
			}

		}

		moveMap[moveMap.length] = map;
	},

	indexMovement : function(army)
	{
		var speed = army.speed;

		var moveMap = [];

		moveMap[0] = {x : army.position.x, y : army.position.y, speed : speed};
		for(var y = 0; y <= speed; y++)
		{
			for(var x = 0; x <= speed; x++)
			{
				var pX = army.position.x + x;
				var pY = army.position.y + y;

				var mX = army.position.x - x;
				var mY = army.position.y - y;

				var map = this.compare(pX, pY, moveMap);
				map= this.compare(pX, mY, moveMap);
				map = this.compare(mX, pY, moveMap);
				map = this.compare(mX, mY, moveMap);
				
			}	
		}
		
		army.moveMap = moveMap;
		return moveMap;
	}
};
