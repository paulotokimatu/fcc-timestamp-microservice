var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/:query", (req, res) => {
    //console.log(req.params.query instanceof Date && !isNaN(req.params.query.valueOf()));
    var months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];
    var timestamp = "";
    var natural = "";
    
    if ( !isNaN( Number(req.params.query) ) ) {
        timestamp = req.params.query;
        natural = new Date(req.params.query * 1000);
        natural = months[natural.getMonth()] + " " + natural.getDate() + ", " + 
        natural.getFullYear();
    }
    else if( !isNaN( Date.parse(req.params.query) ) ) {
        natural = req.params.query;
        timestamp = Date.parse(req.params.query)/1000;
    }
    res.send({unix: timestamp, natural: natural});
    //res.render("index", {query: req.params.query});
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen((process.env.PORT || 3000), () => {
    console.log("Server up");
});