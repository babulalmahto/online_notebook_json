const app = require("./app");
const PORT = 5000;
const http = require("http");
const hostName = "127.0.0.1";

const server = http.createServer(app);

server.listen(PORT, hostName, () => {
    console.log(`server started with http://${hostName}:${PORT}`);
})