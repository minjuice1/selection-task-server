// // How NodeJS differs from Vanilla JS
// // 1) Node runs on a server - not in a browser (backend not frontend)
// // 2) The console tis the terminal window
// // 3) global object instead of window object
// // 4) Has Common core modules that we will explore
// // 5) CommonJS modules instead of ES6 modules

const os = require("os");
const path = require("path");
const { add } = require("./math");

console.log(add(2, 3));

// // console.log(os.type());
// // console.log(os.version());
// // console.log(os.homedir());
