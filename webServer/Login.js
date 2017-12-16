class Login{
	constructor(server)
	{	
		console.log("login");
		this.setLogin(server);
		this.setLogout(server);
		this.setIsLogged(server);
	}

	setLogin(app)
	{
		app.post('/login', function (req, res) {
			res.setHeader('Content-Type', 'application/json');

            if (!req.body.username || !req.body.password) {
                res.send(JSON.stringify({
                	isAuth: false
                }));    
            } 
            else if(req.body.username === "admin" || req.body.password === "heslo") {
                req.session.user = req.body.username;
                req.session.admin = true;
                res.send(JSON.stringify({ 
                	isAdmin: true,
                	isAuth: true,
                	user: req.session.user
                }));
            } 
            else
            {
        	    res.send(JSON.stringify({
                	isAuth: false
                }));   
            }
        });
	}
	setLogout(app)
	{
		app.post('/logout', function (req, res) {
          req.session.destroy();
          res.send("logout success!");
        });    
	}

	setIsLogged(app)
	{
		app.get("/logged", function (req, res) {
			res.setHeader('Content-Type', 'application/json');
			if(req.session.user)
			{
				res.send(JSON.stringify({ 
	            	isAdmin: req.session.admin,
	            	isAuth: true,
	            	user: req.session.user
          		}));
			}
			else 
			{
				res.send(JSON.stringify({ 
	            	isAuth: false
          		}));
			}
          	
        });    
	}
}

module.exports = Login;