const router = require("express").Router();
const todoRoutes = require("./todos");

// todo routes
router.use("/todos", todoRoutes);

module.exports = router;
