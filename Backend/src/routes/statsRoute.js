import express from "express";
// Import các hàm xử lý từ controller (có đuôi .js)
import {
  getOverview,
  getTopBooks,
  getBorrowStatus,
} from "../controllers/statsController.js";

const router = express.Router();
//GET /overview
router.get("/overview", getOverview);
//GET /top-books
router.get("/top-books", getTopBooks);
//GET /borrow-status
router.get("/borrow-status", getBorrowStatus);

export default router;