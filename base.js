const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const PORT = 3000;
const print = (show) => console.log(show);
const safify = (val) => {
  if (!val) return "";
  else return val;
};

const app = express();

app.engine(
  "handlebars",
  engine({
    extname: "html",
    defaultLayout: false,
    layoutsDir: "views/",
  }),
);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname + "/static")));
app.use(express.json());
app.use(morgan("tiny"));
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

app.listen(PORT, function () {
  print("http://localhost:" + PORT);
});


app.get("/", async (req, res) => {
	res.status(200).json(200);
});

app.get("/streaming/:slug", async (req, res) => {
  const slug = req.params.slug;
  const source = await get_source(slug);
  res.render("index", {
    site_name: "",
    file: source,
  });
});


async function get_source(slug) {
  const url = `https://player.anikatsu.me/?id=${slug}`;
  const request_option = {
    method: "GET",
    url: url,
  };
  const response = await axios(request_option).catch((error) => {
    return null;
  });
  const status_code = response.status;

  if (status_code == 200) {
    const html = response.data;
    const $ = cheerio.load(html);
    const data = $("script").get()[2].children[0].data;
	const source = data.split("advertising")[0].split("playlist")[1].split("file")[1].replace('": ', "").split("}]")[0].split("`")[1]
	
	return source
  }
}

//? 404 HANDLER
app.get("*", function (req, res) {
  res.status(404).json(404);
});
//? 404 HANDLER
