import express from "express";

import {
  getAllCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar,
} from "../controllers/car.controller.js";

const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", getCarById);
router.post("/", addCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

export default router;
