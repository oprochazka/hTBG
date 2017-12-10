Utils = {
	intersecPointRect : function(point, rect)
	{
		if(point.x >= rect.x && point.y >= rect.y && 
			point.x <  rect.x + rect.w && point.y <  rect.y + rect.h)
		{
			return true;
		}
		return false;
	}
};