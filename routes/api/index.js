const router = require("express").Router();
const userRoutes = require("./userRoutes");
const cardRoutes = require("./cardRoutes");

// Book routes
router.use("/users", userRoutes);
router.use("/cards", cardRoutes);

module.exports = router;