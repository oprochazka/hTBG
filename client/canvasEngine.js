var testSquare;
var first = true;


function getMousePos (canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

function initialization()
{
  var canvas = document.getElementById('canvasLayer1');

  $('body').on('contextmenu', '#canvasLayer1', function(e){ return false; });

  canvas.onselectstart = function () { return false; } // ie
  canvas.onmousedown = function () { return false; }
  Draw.initModule(canvas);
  Field.initModule(canvas, 64, 64);
  Client.initModule();


  canvas.addEventListener('mousemove', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      
      Field.refreshMouse(mousePos, evt);

    }, false);

  canvas.addEventListener('click', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      
      Field.onClick(mousePos, evt);

    }, false);

  canvas.addEventListener('mousedown', function (e){
    
  }, false);

    UIPlayer.init();
   
  //Field.move(10, 10);

   // GameEngine.startGame();
}



function gameLoop () 
{
    if(first)
    {
       initialization();
    }

    window.requestAnimationFrame(gameLoop);        

    Field.render();

    first = false;
    var player = GameEngine.getControllPlayer();
    if(player)
    {
      UIPlayer.refreshUi(player);
    }
}

gameLoop();