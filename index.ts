import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import pokemonRoutes from "./routes/pokemonRoutes";
// import errorHandle from "./middlewares/errorHandle";
import "./jobs/hpDecrease" 
import "./jobs/cookingMeals"
import "./jobs/dailyReward";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5 reties of connection
mongoose
  .connect(process.env.MONGODB_URI,{
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(error);
  });


app.use("/user", userRoutes);

app.use("/pokemon", pokemonRoutes);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript!!");
});

// app.use(errorHandle);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
