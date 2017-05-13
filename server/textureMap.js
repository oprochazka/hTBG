TextureMap = {
	config : [
		{r : 0, g : 0, b : 0, type : "mountain"},
		{r : 100, g : 0, b : 0, type : "water"},
		{r : 0, g : 100, b : 0, type : "grass"},
		{r : 100, g : 0, b : 100, type : "wood"},
    {r : 100, g : 100, b : 100, type : "swamp"}
	],

  layer2 : [
    {r : 154, g : 28, b : 14, type : "player", order : 0},
    {r : 13, g : 136, b : 45, type : "player", order : 1},
    {r : 151, g : 14, b : 154, type : "player", order : 2},
    {r : 14, g : 14, b : 154, type : "player", order : 3},
    {r : 225, g : 182, b : 11, type : "player", order : 4},
  ],

	loadTexture : function(path, pathDesc)
	{
		var mapArray = [];

		GetPixel(path, function(err, pixels) {
          if(err) {
            console.log("Bad image path")
            return
          }          

          for(var i = 0; i < pixels.data.length; i += 4)
          {          	
          	var r = pixels.data[i];
          	var g = pixels.data[i+1];
          	var b = pixels.data[i+2];

          	for(var z = 0; z < TextureMap.config.length; z++)
          	{
          		var conf = TextureMap.config[z];
          		if(conf.r == r && conf.g == g && conf.b == b)
          		{
          			mapArray[mapArray.length] = conf.type;

          			break;
          		}
          	}			
          }          

          TextureMap.loadLayer2(pathDesc, pixels.shape[0], pixels.shape[1], mapArray);
        });
	},

  loadLayer2 : function(path, width, height, mapArray)
  {
      GetPixel(path, function(err, pixels) {
          if(err) {
            console.log("Bad image path")
            return
          }          

          var players = {};

          for(var i = 0; i < pixels.data.length; i += 4)
          {           
            var r = pixels.data[i];
            var g = pixels.data[i+1];
            var b = pixels.data[i+2];

            for(var z = 0; z < TextureMap.layer2.length; z++)
            {
              var conf = TextureMap.layer2[z];
              if(conf.r == r && conf.g == g && conf.b == b)
              {
                players[conf.order] = i/4; 

                break;
              }
            }     
          }     


          GameEngine.startServer(width, height, mapArray, players);

        });
  },

	getPixelColor : function(pixels)
	{

	}
};