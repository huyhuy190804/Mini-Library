import express from "express";
// Import các hàm xử lý từ controller (có đuôi .js)
import {
  create,
  getAll,
  getDetail,
  update,
  remove,
} from "../controllers/authorController.js";
const router = express.Router();
router.get("/", getAll);
router.get("/:id", getDetail);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;