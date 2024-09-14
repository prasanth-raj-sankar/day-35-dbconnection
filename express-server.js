import express from "express";
// import { connectbd } from "./db-utils/db-connection.js";
import studentRouter from "./routes/students.js";
import { connectViaMongoose } from "./db-utils/mongoos-connetions.js";
import mentorRouter from "./routes/mentor.js";

const server = express();

// Middleware used by server to read the body of a request
server.use(express.json());

// link the studentRouter with express server
server.use("/students", studentRouter);
server.use("/mentors", mentorRouter);

const PORT = 4500;

// Connect to DB then start the server

// Method Top Level Module await
// await connectbd(); // this line will wait and connect to DB then next lines will executed?
await connectViaMongoose();

server.listen(PORT, () => {
  console.log("Server listening on ", PORT);
});