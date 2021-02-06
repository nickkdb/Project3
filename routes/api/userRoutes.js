const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/books"
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

// Matches with "/api/books/:id"
router.route("/:id")
.get(userController.findByEmail);
  // .get(userController.findById)
  // .put(userController.update)
  // .delete(userController.remove);

// router.route("/email")
// .get(userController.findByEmail);

module.exports = router;