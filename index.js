import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
// import dbConnect from "./db/connection.js";
import app from "./app.js";
import dbConnect from "./db/connetion.js";
const port = process.env.PORT || 8000;
// import server from "./app.js";

dbConnect()
  .then(() =>
    app.listen(port, () =>
      console.log("server is running smooth af on port", port)
    )
  )
  .catch((err) => console.log(err));

 
