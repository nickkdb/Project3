const router = require("express").Router();
const tradeController = require("../../controllers/tradeController");

// Matches with "/api/books"
router.route("/")
.post(tradeController.create)
.get(tradeController.find)
  

// Matches with "/api/books/:id"
router.route("/:id")
  .get(tradeController.findOne)
  .put(tradeController.update)
  .delete(tradeController.remove);

module.exports = router;