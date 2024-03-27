import express from "express";
import { ussdRequest } from "../controllers/ussd.controller.js";

const router = express.Router();

router.post("/", ussdRequest);

export default router;
