const router = require("express").Router();
const userRoutes = require("./userRoutes");
const cardRoutes = require("./cardRoutes");
const chatRoutes = require("./chatRoutes")

// Book routes
router.use("/users", userRoutes);
router.use("/cards", cardRoutes);
router.use("/chats", chatRoutes);

module.exports = router;