import express from "express";
//database conntection
import connection from "./models/index.js";
import bookRoute from "./routes/bookRoute.js";
import "dotenv/config";
import cors from "cors";

const app = express();
//if json then parse
app.use(express.json());
//middleware if url format then parse
app.use(express.urlencoded({ extended: false }));
//for giving access to cross origin resource sharing(cors)
app.use(cors());
//for image because image is static data // otherwise it treat as route 
app.use(express.static("public"));

// routes homepage means slash
app.get("/", (req, res) => {
  res.send("backend is working");
});
//
app.use("/book", bookRoute);

app.listen(process.env.PORT || 8000, async () => {
  // console.log("Server has been started");

  //connected to database is successfull
  try {
    await connection.authenticate();
    //basically sync will make the table if it has not been made.
    connection.sync();
    console.log("Successfully connect to database ");
  } catch (error) {
    console.error("Error during connection ti database");
  }
});
