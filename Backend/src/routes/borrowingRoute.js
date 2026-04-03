import express from "express";
// Import các hàm xử lý từ controller (có đuôi .js)
import {
  create,
  getAll,
  getDetail,
  update,
  remove,
  returnBook,
} from "../controllers/borrowingController.js";

const router = express.Router();
router.get("/", getAll);
router.get("/:id", getDetail);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);
router.put('/:id/return', returnBook)
export default router;