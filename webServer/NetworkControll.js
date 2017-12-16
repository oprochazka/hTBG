var Login = require("./Login.js");
var SocketManager = require("./socketManager.js")

class NetworkControll {
    constructor(server)
    {
        this.setServer(server);

        this.setRest(server);
        this.setError(server);

        console.log("Open REST");

        this.socket = new SocketManager();
    }
    setServer(server)
    {
        this.server = server;
    }
    isAuth(req, res, next)
    {
        if (req.session && req.session.admin)
            return next();
        else
            return res.sendStatus(401);
    }   

    startServer(app)
    {
        app.post('/startServer', this.isAuth, (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            console.log("fakt");
            this.socket.sendMessage({
                type: "start",
                map: req.body.map
            });

            res.send(JSON.stringify({
                isServer: true
            }));   
            
        });
    }

    getMaps(app)
    {
        var maps = [{
            url: "./maps/map1",
            name: "map1"
        },
        {
            url: "./maps/map2",
            name: "map2"
        }];

        app.get('/getMaps', this.isAuth, function (req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(
                JSON.stringify(maps));
        }); 
    }
    setRest(app)
    {    
        this.login = new Login(app);

        this.getMaps(app);
        this.startServer(app);

        app.get('/content', this.isAuth, function (req, res) {
            res.send("You can only see this after you've logged in.");
        });
    }

    setError(app)
    {
        app.use(function(req, res, next) {
          var err = new Error('Not Found');
          err.status = 404;
          next(err);
        });

        app.use(function(err, req, res, next) {
          res.locals.message = err.message;
          res.locals.error = req.app.get('env') === 'development' ? err : {};

          res.status(err.status || 500);
          res.send('error' + err);
        });
    }
}

module.exports = NetworkControll;
