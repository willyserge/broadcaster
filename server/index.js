import express from "express";
import dotenv from 'dotenv';
const app = express();
dotenv.config();


app.get("/", (req, res) => {
  res.json({ status: "success", message: "Welcome To Broadcaster" });
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

export default app