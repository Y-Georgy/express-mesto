const router = require("express").Router();
const userRouter = require("./users.js");
const cardRouter = require("./cards.js");

router.use("/users", userRouter);
router.use("/cards", cardRouter);

module.exports = router;
