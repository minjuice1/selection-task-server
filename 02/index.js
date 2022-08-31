const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
	try {
		const data = await fsPromises.readFile(
			path.join(__dirname, "files", "starter.txt"),
			"utf8",
		);
		console.log("readFile");
		console.log(data);
		await fsPromises.unlink(
			path.join(__dirname, "files", "starter.txt"),
			"utf8",
		);
		await fsPromises.writeFile(
			path.join(__dirname, "files", "promisesWrite.txt"),
			data,
		);
		console.log("writeFile");
		await fsPromises.appendFile(
			path.join(__dirname, "files", "promisesWrite.txt"),
			"\n\nNice to meet you",
		);
		console.log("appendFile");
		await fsPromises.rename(
			path.join(__dirname, "files", "promisesWrite.txt"),
			path.join(__dirname, "files", "promisesComplete.txt"),
		);
		console.log("rename");
		const newData = await fsPromises.readFile(
			path.join(__dirname, "files", "promisesComplete.txt"),
			"utf8",
		);
		console.log("readNewFile");
		console.log(newData);
	} catch (err) {
		console.log(error(err));
	}
};

fileOps();

// fs.readFile(
// 	path.join(__dirname, "files", "starter.txt"),
// 	"utf8",
// 	(err, data) => {
// 		if (err) throw err;
// 		console.log(data);
// 	},
// );

// fs.writeFile(
// 	path.join(__dirname, "files", "reply.txt"),
// 	"Nice to meet you",
// 	(err) => {
// 		if (err) throw err;
// 		console.log("write complete");
// 	},

// 	fs.appendFile(
// 		path.join(__dirname, "files", "reply.txt"),
// 		"\n\nYes it is!",
// 		(err) => {
// 			if (err) throw err;
// 			console.log("Append complete");

// 			fs.rename(
// 				path.join(__dirname, "files", "reply.txt"),
// 				path.join(__dirname, "files", "newReply.txt"),
// 				(err) => {
// 					if (err) throw err;
// 					console.log("Rename complete");
// 				},
// 			);
// 		},
// 	),
// );

process.on("uncaughtException", (err) => {
	console.log(error(`There was an uncaught error : ${err}`));
	process.exit(1);
});
