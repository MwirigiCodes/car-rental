import Car from "../models/Car.js";

export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).json(cars);
  } catch (error) {
    console.log("Error in getAllCars controller: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCarById = async (req, res) => {
  try {
    const { id } = rq.params;
    const car = await Car.findOne({ _id: id });

    if (!car) return res.status(404).json({ message: "Car not found" });

    res.status(200).json(car);
  } catch (error) {
    console.log("Error in getAllCars controller: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addCar = async (req, res) => {
  try {
    const { brand, model, cc, year, dailyCost } = req.body;

    if (!brand || !model || !cc || !year || !dairyCost)
      return res.status(400).json({ message: "All fields are required" });

    const car = await Car.create({ brand, model, cc, year, dailyCost });

    res.status(201).json(car);
  } catch (error) {
    console.log("Error in addCar controller: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { brand, model, cc, year, dailyCost } = req.body;

    const car = await Car.findOne({ _id: id });

    if (!car) return res.status(404).json({ message: "Car not found" });

    const updatedCar = await Car.updateOne(
      { _id: id },
      { brand, model, cc, year, dailyCost },
      { returnDocument: "after" },
    );

    res.status(200).json({ message: "Car updated successfully", car });
  } catch (error) {}
};

export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.log("Error in deleteCar controller: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
