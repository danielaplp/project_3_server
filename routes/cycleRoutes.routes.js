const router = require("express").Router();
const CycleRoute = require("../models/CycleRoute.model");
const User = require("../models/User.model")

router.post("/cycleroutes", async (req, res, next) => {
  try {
    const { startLocation, endLocation, type, userId } = req.body;

    const newCycleRoute = await CycleRoute.create({
      startLocation,
      endLocation,
      type,
      creator: userId
    });
    await User.findByIdAndUpdate(userId, {
      $push: {
        createdRoutes: newCycleRoute._id
      }
    });

    res.status(201).json(newCycleRoute);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/cycleroutes", async (req, res, next) => {
  try {
    const allCycleRoutes = await CycleRoute.find();

    res.status(200).json(allCycleRoutes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/cycleroutes/:cycleroutesId", async (req, res, next) => {
  try {
    const { cycleroutesId } = req.params;
    const singleCycleRoute = await CycleRoute.findById(cycleroutesId);

    res.status(200).json(singleCycleRoute);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.put("/cycleroutes/:cycleroutesId", async (req, res, next) => {
  try {
    const { cycleroutesId } = req.params;
    const { startLocation, endLocation, type } = req.body;

    const updatedCycleRoute = await CycleRoute.findByIdAndUpdate(
      cycleroutesId,
      {
        startLocation,
        endLocation,
        type,
      },
      { new: true },
    );

    res.status(200).json(updatedCycleRoute);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.delete("/cycleroutes/:cycleroutesId", async (req, res, next) => {
  try {
    const { cycleRouteId } = req.params;

    await CycleRoute.findOneAndDelete(cycleRouteId);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
