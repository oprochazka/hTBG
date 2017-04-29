UIDynamic = {
	armyStats : document.getElementById('armyStats'),	
	armyStatsImg : document.getElementById('armyStatsImg'),
	buyItems : document.getElementById('buyItems'),

	_getRow : function(key, value)
	{
		return "<div> " + key +" : " + value + "</div>"
	},

	setSelectedObject: function(object)
	{
		this.armyStats.innerHTML = "";
		this.buyItems.innerHTML = "";
		
		if(object.name == "army")
		{
			this.armyStats.innerHTML = this._getRow("Attack", object.powerAttack);
			this.armyStats.innerHTML += this._getRow("Movement", object.speed);
			this.armyStats.innerHTML += this._getRow("Range", object.range); 
			this.armyStats.innerHTML += this._getRow("Health", object.health); 
			this.armyStats.innerHTML += this._getRow("Fights", object.fights); 

			armyStatsImg.src= "http://"+ GameEngine.server +"/asets/"+object.img;
		}

		if(object.name == "building")
		{			
			this.armyStats.innerHTML = this._getRow("Product", object.productArmy || "---");
			this.armyStats.innerHTML += this._getRow("Earn money", object.earnGold || "0");

			armyStatsImg.src= "http://"+ GameEngine.server +"/asets/"+object.img;	

			/*if(object.productArmy)
			{
				this.buyItems.addChild(this.addProduct(ArmyDesc[object.productArmy]));				
			}*/
		}
	},

	addProduct: function(product)
	{
		return document.createElement("<div class='item'><img src='" +"http://"+ 
			GameEngine.server +"/asets/"+product.img + "'/><span>Cost: " + product.cost +"</div>");		
	}
};