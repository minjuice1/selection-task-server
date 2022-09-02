const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = [
	"https://www.yoursite.com",
	"http://127.0.0.1:5500/",
	"http://localhost:3500",
];
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStaus: 200,
};
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// "content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|/index(.html)?", (req, res) => {
	// res.sendFile("./views/index.html", { root: __dirname });
	res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/new-page(.html)?", (req, res) => {
	res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
	res.redirect(301, "/new-page.html"); // 302 by default
});

// Route handlers
app.get(
	"/hello(.html)?",
	(req, res, next) => {
		console.log("attempted to load hello.html");

		// 다음 핸들러 또는 다음 express로 넘어간다.
		next();
	},
	(req, res) => {
		res.send("Hello World");
	},
);

// chaining route handlers

const one = (req, res, next) => {
	console.log("one");
	next();
};
const two = (req, res, next) => {
	console.log("two");
	next();
};
const three = (req, res) => {
	console.log("three");
	res.send("DONE");
};

app.get("/chain(.html)?", [one, two, three]);

// app.use는 middleware이며, regex을 허용하지 않는다.
// app.use which is middleware and does not accept regex
// app.all은 routing 역할을 하고, 모든 http methods에 한번에 응답한다.
// app.all which is more for routing and it will apply to all http methods at once
app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		res.json({ error: "404 Not Found" });
	} else {
		res.type("txt").send("404 Not Found");
	}
});

app.use(errHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// 	myEmitter.emit("log", "Log event emitted!");
