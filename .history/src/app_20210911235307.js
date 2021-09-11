require("dotenv").config();
const path  = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 3000;

// console.log("path-->", path.join(__dirname.toString(), "../public"));
const publicDirectoryPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname,"../template/views");
const partialPath = path.join(__dirname,"../template/partials");

app.set("view engine", "hbs");
app.set("views",templatePath );
// express.static(root, [options])
hbs.registerPartials(partialPath);

// for using serving HTML Pages
app.use(express.static(publicDirectoryPath));

// for routing 
app.get("", (req, res) => {
    console.log("HOME");
    // res.end();
    res.render("index");
});

app.get("/about", (req, res) => {
    console.log("ABOUT");
    // res.end();
    res.render("about");
});

app.get("/weather", (req, res) => {
    console.log("WEATHER");
    // res.end();
    res.render("weather");
});

app.get("*", (req, res) => {
    console.log("404_PAGE");
    // res.end();
    res.render("404Error", {
        errorMsg: "No Page Found !!"
    });
});

app.listen(port, () => {
    console.log(`Express Server Listening On Port Number => ${port}`, process.env.weatherAppId)
});