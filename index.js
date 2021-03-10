const { createServer } = require("vercel-node-server");
const listen = require("test-listen");

// Import Your Lambda Function
const searchLambda = require("./api/search");

let server;
let url;

const startServer = async () => {
  server = createServer(searchLambda);
  url = await listen(server);
  console.log(url);
};

startServer();

// server.close();
