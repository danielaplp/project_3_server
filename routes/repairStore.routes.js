const router = require("express").Router();
const RepairStore = require("../models/RepairStore.model");
const User = require("../models/User.model");

router.post("/repairstore", async (req, res, next) => {
  try {
    const { location, name, userId } = req.body;

    const newRepairStore = await RepairStore.create({
      location,
      name,
      creator: userId,
    });

    await User.findByIdAndUpdate(userId, {
      $push: {
        createdRepairStores: newRepairStore._id,
      },
    });

    res.status(201).json(newRepairStore);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/repairstore", async (req, res, next) => {
  try {
    const allRepairStores = await RepairStore.find();

    res.status(200).json(allRepairStores);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/repairstore/:repairstoreId", async (req, res, next) => {
  try {
    const { repairstoreId } = req.params;
    const singleRepairStore = await RepairStore.findById(
      repairstoreId,
    )

    res.status(200).json(singleRepairStore);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.put("/repairstore/:repairstoreId", async (req, res, next) => {
  try {
    const { repairstoreId } = req.params;
    const { location, name, userId } = req.body;

    const foundRepairStore = await RepairStore.findById(repairstoreId);

    if (userId !== foundRepairStore.creator.toString()) {
      res.status(403).send("Unathorized user");
      return;
    }

    const updatedRepairStore = await RepairStore.findByIdAndUpdate(
      repairstoreId,
      {
        location,
        name,
      },
      { new: true },
    );

    res.status(200).json(updatedRepairStore);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.delete("/repairstore/:repairstoreId", async (req, res, next) => {
  try {
    const { repairstoreId } = req.params;

    await RepairStore.findOneAndDelete(repairstoreId);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
