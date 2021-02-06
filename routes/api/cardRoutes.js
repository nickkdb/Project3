const router = require("express").Router();
const userController = require("../../controllers/cardController");

// Matches with "/api/books"
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

// Matches with "/api/books/:id"
router.route("/:id")
  .get(userController.findOne)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;