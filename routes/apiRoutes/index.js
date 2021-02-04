const router = require("express").Router();
const userRoutes = require("./userRoutes");

// Book routes
router.use("/api", userRoutes);

module.exports = router;