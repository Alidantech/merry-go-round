import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ussdRoutes from "./routes/ussd.routes.js";
import transactionsRoutes from "./routes/payments.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes to apis
app.use("/api/payment", transactionsRoutes);
app.use("/api/ussd", ussdRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Merry go round USSD App");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
