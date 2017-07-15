var express = require("express");

var router = express.Router();

// From Matt
var router = express.Router();
//router.use(bodyParser.json());

// Import the model (cat.js) to use its database functions.
var gameObj = require('./game.js');
var pageloads = 0;

// From Main
// USERINFO
var userinfo = require("../models/userinfo.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    userinfo.all(function(data) {
        var hbsObject = {
            userinfo: data
        };
        console.log(hbsObject);
        res.render("home", hbsObject);
    });
});

router.post("/", function(req, res) {
    userinfo.create([
        "user_name", "user_password"
    ], [
        req.body.user_name, req.body.user_password
    ], function() {
        res.redirect("/");
    });
});
// End from Main


router.get("/login", function(req, res) {

    var public = [{
        text: '???'
    }];

    var mine = [{
        text: 'WHARRGARBL!!!'
    },
        {
            text: 'um ok'
        }];

//        console.log(req.params);
    res.render("login", {public: public, mine: mine});
    //  });
});


// Create all our routes and set up logic within those routes where required.
router.get("/login", function(req, res) {

//    console.log(req.query);

    var public = [{
        text: '???'
    }];

    var mine = [{
        text: 'WHARRGARBL!!!',
        playable:true
    },
        {
            text: 'um ok',
            playable:false
        }];

    res.render("login", {public: public, mine: mine});

    //  });
});


// playarea was /game
// router.get("/game", function(req, res) {
router.post("/playarea", function(req, res) {

//    post
    var playerToken = req.body;

// get
//  console.log(req.query,'query');
//     var player = req.query;

    pageloads++;

    var finder = new gameObj.getGamePlayer(playerToken.game,playerToken.name);

    var game = finder.game;
    var player = finder.player;


    //    var cardShower = new gameObj.showPlayPhaseCards(game,player,true);
    var cardShower = new gameObj.showPlayPhaseCards(game,player);


    var public = cardShower.inPlay;
    var mine = cardShower.inHand;
    var adj = cardShower.adj;

//    var names = cardShower.players;

    /*   var public = gameObj.showPlayPhaseCards(game,player,true).inPlay;
     var mine = gameObj.showPlayPhaseCards(game,player,true).inHand;*/

//    var public = getGamePlayer(playerToken);

    console.log('Player to log in:', player);
    console.log(gameObj.validate(player));

    console.log('gameObj.done(player.game);');
//    gameObj.done(player.game);
    gameObj.done(playerToken);

    // playarea was index2
    return res.render("playarea", {player:player, public:public, mine:mine, pageloads:pageloads, adj:adj} ,function(err, html){
        if (err) {
            console.log("ERR", err);

            // An error occurred, stop execution and return 500
            return res.status(500).send();
        }

//        console.log(html);
        // Return the HTML of the View
        return res.send(html);
    });

});

// End from Matt

/*
// USERINFO
var userinfo = require("../models/userinfo.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  userinfo.all(function(data) {
    var hbsObject = {
      userinfo: data
    };
    console.log(hbsObject);
    res.render("home", hbsObject);
  });
});

router.post("/", function(req, res) {
  userinfo.create([
    "user_name", "user_password"
  ], [
    req.body.user_name, req.body.user_password
  ], function() {
    res.redirect("/");
  });
});

// PROFILE
var profile = require("../models/profile.js");

// Create all our routes and set up logic within those routes where required.
router.get("/profile", function(req, res) {
    profile.all(function(data) {
        var hbsObject = {
            profile: data
        };
        console.log(hbsObject);
        res.render("profile", hbsObject);
    });
});

router.post("/", function(req, res) {
    profile.create([
        "user_name", "user_password"
    ], [
        req.body.user_name, req.body.user_password
    ], function() {
        res.redirect("/");
    });
});


// LOGIN
var login = require("../models/login.js");

// Create all our routes and set up logic within those routes where required.
router.get("/login", function(req, res) {
    login.all(function(data) {
        var hbsObject = {
            login: data
        };
        console.log(hbsObject);
        res.render("login", hbsObject);
    });
});

router.post("/", function(req, res) {
    login.create([
        "user_name", "user_password"
    ], [
        req.body.user_name, req.body.user_password
    ], function() {
        res.redirect("/");
    });
});

/*
//  PARTIALS
//  NOUNS
var nouns = require("../models/nouns.js");

router.get("/playarea", function(req, res) {
    nouns.all(function(data) {
        var hbsObject = {
            nouns: data
        };
        console.log(hbsObject);
        res.render("playarea", hbsObject);
    });
});

router.post("/playarea", function(req, res) {
    nouns.create([
        "noun", "description"
    ], [
        req.body.noun, req.body.description
    ], function() {
        res.redirect("/");
    });
});
*/
/*
//    ADJECTIVES
var adjectives = require("../models/adj.js");

router.get("/playarea", function(req, res) {
    adjectives.all(function(data) {
        var hbsObject = {
            adjectives: data
        };
        console.log(hbsObject);
        res.render("playarea", hbsObject);
    });
});

router.post("/playarea", function(req, res) {
    adjectives.create([
        "adjective", "description"
    ], [
        req.body.adjective, req.body.description
    ], function() {
        res.redirect("/");
    });
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  userinfo.update({
    user_name: req.body.user_name
  }, condition, function() {
    res.redirect("/");
  });
});
*/

// Export routes for server.js to use.
module.exports = router;
