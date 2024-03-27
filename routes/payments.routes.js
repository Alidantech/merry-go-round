import express from "express";
import {
  payAmount,
  myCallBack,
  stkpushQuery,
  fetchAllTransactions,
  fetchOneTransaction,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/pay", payAmount);
router.post("/callback", myCallBack);
router.post("/query", stkpushQuery);
router.get("/transactions", fetchAllTransactions);
router.get("/transactions/:id", fetchOneTransaction);

export default router;
