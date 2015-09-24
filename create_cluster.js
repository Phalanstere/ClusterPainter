/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */ /*global define */
var TV      = require("timestamped-visuals"),
    fs      = require("fs"),
    util    = require("util");
    




var x = new TV({
                path: "./images",             // here you have to pass 
                filename: "cluster.json", 
                callback: null,
                timeframe: "day"
                });


console.log(util.inspect(x));
  
                
function done(result)
{
"use strict";
console.log("Hiier kommt der Callback");

var s;
    s = JSON.stringify(result); 
    fs.writeFile(x.filename, s, function (err) {
        if (!err) console.log("ERFOLGREICH GESCHRIEBEN");
    });
}