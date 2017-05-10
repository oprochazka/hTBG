Builder = {
	makeBuilder : function(armyDescType)
	{
		var builderShared = BuilderShared.makeBuilderShared(armyDescType);

		var oldLostFocus = builderShared.lostFocus;

		var out = {
			onProductBuilding :function(product)
			{
				console.log("produkuj");

				this.flag = "build";
				this.chosen = product;

				var map = this.buildingPosition(product);

				Field.setMoveMap({color : null, map: map});
			},

			lostFocus: function(position, object, key, lastMouseKey)
			{	
				if(this.flag == "build")
				{
					if(this.map && this.checkMapObject(this.map, position))
					{
					
						Client.sendActionMessage({type : "buildObject", 
							id : this.id, productObject : this.chosen, x : position.x, y : position.y}, GameEngine.getControllPlayer());	
					}
				}

				oldLostFocus.call(this, position,object,key,lastMouseKey);			

				this.flag = null;
			}
		};

		return Object.assign(builderShared, out);
	}	
};