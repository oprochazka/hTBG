TextureMap = {
	config : [
		{r : 0, g : 0, b : 0, type : "mountain"},
		{r : 100, g : 0, b : 0, type : "water"},
		{r : 0, g : 100, b : 0, type : "grass"},
		{r : 100, g : 0, b : 100, type : "wood"}
	],

	loadTexture : function(path)
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

          GameEngine.startServer(pixels.shape[0], pixels.shape[1], mapArray);

        });
	},

	getPixelColor : function(pixels)
	{

	}
};