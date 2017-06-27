DEBUG=true;
HOST = null; // localhost
PORT = 9663;

// when the daemon started
var starttime = (new Date()).getTime();

var mem = process.memoryUsage();
// every 10 seconds poll for the memory.
setInterval(function () {
    mem = process.memoryUsage();
}, 10*1000);


var fu = require("./js/fu"),
sys = require("sys"),
url = require("url"),
qs = require("querystring");

var MESSAGE_BACKLOG = 2000000000000000000000,
SESSION_TIMEOUT = 60000 * 1000;

var channel = new function () {
    var messages = [],
    callbacks = [];
    
    //  this.appendMessage = function (nick, type, text) {
    
    this.appendMessage = function (nick, message) {
        
        switch (message.type) {
        case "msg":
            sys.puts("<" + nick + "> " + message.text);
            break;
        case "join":
            sys.puts(nick + " join");
            break;
        case "part":
            sys.puts(nick + " part");
            break;
            
        case "newBlock":
            // Server sets the GUID for new things
            message.guid = newGuid();
            sys.puts( nick + ": " + JSON.stringify(message));
            break;
            
        default:
            //            sys.puts(nick+ ": " + JSON.stringify(message));
        }
        
        
        messages.push( message );
        
        while (callbacks.length > 0) {
            callbacks.shift().callback([message]);
        }
        
        while (messages.length > MESSAGE_BACKLOG) {
            messages.shift();
        }
    };
    
    this.query = function (since, callback) {
        var matching = [];
        for (var i = 0; i < messages.length; i++) {
            var message = messages[i];
            if (message.timestamp > since)
                matching.push(message)
        }
        
        if (matching.length != 0) {
            callback(matching);
        } else {
            callbacks.push({ timestamp: new Date(), callback: callback });
        }
    };
    
    // clear old callbacks
    // they can hang around for at most 30 seconds.
    setInterval(function () {
        var now = new Date();
        while (callbacks.length > 0 && now - callbacks[0].timestamp > 30*1000) {
            callbacks.shift().callback([]);
        }
    }, 3000);
};

var sessions = {};
var GUID = 0;

function newGuid() {
    GUID++;
    //        return new Date().toString()+GUID;
    return GUID;
}

function createSession (nick) {
    if (nick.length > 50) return null;
    if (/[^\w_\-^!]/.exec(nick)) return null;
    
    for (var i in sessions) {
        var session = sessions[i];
        if (session && session.nick === nick) return null;
    }
    
    var session = { 
        nick: nick, 
        id: Math.floor(Math.random()*99999999999).toString(),
        timestamp: new Date(),
        
        poke: function () {
            session.timestamp = new Date();
        },
        
        destroy: function () {
            channel.appendMessage(session.nick, {type:"part",text:"part"});
            delete sessions[session.id];
        }
    };
    
    sessions[session.id] = session;
    return session;
}

// interval to kill off old sessions
setInterval(function () {
    var now = new Date();
    for (var id in sessions) {
        if (!sessions.hasOwnProperty(id)) continue;
        var session = sessions[id];
        
        if (now - session.timestamp > SESSION_TIMEOUT) {
            session.destroy();
        }
    }
}, 1000);

fu.listen(Number(process.env.PORT || PORT), HOST);

fu.get("/", fu.staticHandler("index.html"));
fu.get("/html/test.html", fu.staticHandler("html/test.html"));
fu.get("/html/cardflip.html", fu.staticHandler("html/cardflip.html"));
fu.get("/css/style.css", fu.staticHandler("css/style.css"));
fu.get("/css/woofie.css", fu.staticHandler("css/woofie.css"));
fu.get("/css/jquery.ui.all.css", fu.staticHandler("css/jquery.ui.all.css"));
fu.get("/i/fokkerdr.jpg", fu.staticHandler("i/fokkerdr.jpg"));
fu.get("/js/date.js", fu.staticHandler("js/date.js"));
fu.get("/js/client.js", fu.staticHandler("js/client.js"));
fu.get("/js/drawing.js", fu.staticHandler("js/drawing.js"));
fu.get("/js/sprite.js", fu.staticHandler("js/sprite.js"));
fu.get("/js/woofie.js", fu.staticHandler("js/woofie.js"));
fu.get("/js/cardflip.js", fu.staticHandler("js/cardflip.js"));
fu.get("/js/jquery-1.6.2.js", fu.staticHandler("js/jquery-1.6.2.js"));
fu.get("/js/jquery-1.5.1.min.js", fu.staticHandler("js/jquery-1.5.1.min.js"));
fu.get("/js/jquery-1.4.3.js", fu.staticHandler("js/jquery-1.4.3.js"));
fu.get("/js/jquery-ui.js", fu.staticHandler("js/jquery-ui.js"));
fu.get("/js/jquery-ui-1.8.14.custom.min.js", fu.staticHandler("js/jquery-ui-1.8.14.custom.min.js"));


fu.get("/i/20101006-texture2.png", fu.staticHandler("i/20101006-texture2.png"));
fu.get("/i/20101006-texture23.png", fu.staticHandler("i/20101006-texture23.png"));
fu.get("/i/20101006-texture2blue.png", fu.staticHandler("i/20101006-texture2blue.png"));
fu.get("/i/20101006-texture2control.png", fu.staticHandler("i/20101006-texture2control.png"));
fu.get("/i/20101006-texture2control2.png", fu.staticHandler("i/20101006-texture2control2.png"));
fu.get("/i/20101006-texture2green.png", fu.staticHandler("i/20101006-texture2green.png"));
fu.get("/i/20101006-texture2green2.png", fu.staticHandler("i/20101006-texture2green2.png"));
fu.get("/i/20101006-texture2green3.png", fu.staticHandler("i/20101006-texture2green3.png"));
fu.get("/i/20101006-texture2looks.png", fu.staticHandler("i/20101006-texture2looks.png"));
fu.get("/i/20101006-texture2looks2.png", fu.staticHandler("i/20101006-texture2looks2.png"));
fu.get("/i/20101006-texture2purple.png", fu.staticHandler("i/20101006-texture2purple.png"));
fu.get("/i/20101006-texture2red.png", fu.staticHandler("i/20101006-texture2red.png"));
fu.get("/i/20101006-texture2royal.png", fu.staticHandler("i/20101006-texture2royal.png"));
fu.get("/i/20101006-texture2variables.png", fu.staticHandler("i/20101006-texture2variables.png"));
fu.get("/i/20101006-texture2variables2.png", fu.staticHandler("i/20101006-texture2variables2.png"));
fu.get("/i/blueblock.png", fu.staticHandler("i/blueblock.png"));
fu.get("/i/booleanblock.png", fu.staticHandler("i/booleanblock.png"));
fu.get("/i/booleanwell.png", fu.staticHandler("i/booleanwell.png"));
fu.get("/i/booleanwell_tgt.png", fu.staticHandler("i/booleanwell_tgt.png"));
fu.get("/i/controlblock.png", fu.staticHandler("i/controlblock.png"));
fu.get("/i/controlblock_tgt.png", fu.staticHandler("i/controlblock_tgt.png"));
fu.get("/i/dark-metal-texture.jpg", fu.staticHandler("i/dark-metal-texture.jpg"));
fu.get("/i/greenblock.png", fu.staticHandler("i/greenblock.png"));
fu.get("/i/greenblock2.png", fu.staticHandler("i/greenblock2.png"));
fu.get("/i/greenblock_tgt.png", fu.staticHandler("i/greenblock_tgt.png"));
fu.get("/i/handlerblock.png", fu.staticHandler("i/handlerblock.png"));
fu.get("/i/handlerblock_tgt.png", fu.staticHandler("i/handlerblock_tgt.png"));

fu.get("/i/numberblock.png", fu.staticHandler("i/numberblock.png"));
fu.get("/i/onebooleanwell_tgt.png", fu.staticHandler("i/onebooleanwell_tgt.png"));
fu.get("/i/scrollbarvert.png", fu.staticHandler("i/scrollbarvert.png"));
fu.get("/i/startup.png", fu.staticHandler("i/startup.png"));
fu.get("/i/yellowhover.png", fu.staticHandler("i/yellowhover.png"));


fu.get("/sprites/dad.png", fu.staticHandler("sprites/dad.png"));
fu.get("/sprites/lucy.png", fu.staticHandler("sprites/lucy.png"));
fu.get("/sprites/sophia.png", fu.staticHandler("sprites/sophia.png"));

fu.get("/who", function (req, res) {
    var nicks = [];
    for (var id in sessions) {
        if (!sessions.hasOwnProperty(id)) continue;
        var session = sessions[id];
        nicks.push(session.nick);
    }
    res.simpleJSON(200, { nicks: nicks
                          , rss: mem.rss
                        });
});

fu.get("/join", function (req, res) {
    var message = JSON.parse(qs.parse(url.parse(req.url).query).message);
    nick = message.nick;
    if (nick == null || nick.length == 0) {
        res.simpleJSON(400, {error: "Bad nick."});
        return;
    }
    var session = createSession(nick);
    if (session == null) {
        res.simpleJSON(400, {error: "Nick in use"});
        return;
    }
    
    //sys.puts("connection: " + nick + "@" + res.connection.remoteAddress);
    
    channel.appendMessage(session.nick, message);
    res.simpleJSON(200, { id: session.id
                          , message: JSON.stringify( {nick: session.nick, 
                                                      type: "join", 
                                                      text:"join",
                                                      timestamp: new Date().getTime()
                                                     }) 
                          , rss: mem.rss
                          , starttime: starttime
                        });
});

fu.get("/part", function (req, res) {
    var id = qs.parse(url.parse(req.url).query).id;
    var session;
    if (id && sessions[id]) {
        session = sessions[id];
        session.destroy();
    }
    res.simpleJSON(200, { rss: mem.rss });
});

fu.get("/recv", function (req, res) {
    if (!qs.parse(url.parse(req.url).query).since) {
        res.simpleJSON(400, { error: "Must supply since parameter" });
        return;
    }
    var id = qs.parse(url.parse(req.url).query).id;
    var session;
    if (id && sessions[id]) {
        session = sessions[id];
        session.poke();
    }
    
    var since = parseInt(qs.parse(url.parse(req.url).query).since, 10);
    
    channel.query(since, function (messages) {
        if (session) session.poke();
        res.simpleJSON(200, { messages: messages, rss: mem.rss });
    });
});


sendResponse = function (req, res) {

    console.log(req);
    var id = qs.parse(url.parse(req.url).query).id;
    var message = JSON.parse(qs.parse(url.parse(req.url).query).message);
    
    var session = sessions[id];
    if (!session || !message.type) {
        res.simpleJSON(400, { error: "No such session id" });
        return;
    }
    
    session.poke();
    
    message.nick = session.nick;
    message.timestamp = new Date().getTime();
    channel.appendMessage(session.nick, message);
    res.simpleJSON(200, { rss: mem.rss });
};


fu.get("/send", function (req,res) {
    sendResponse(req,res);
});


/* need to make a new /move and simpleJSON to move location data.
  Do we need to store it? */