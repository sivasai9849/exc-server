const express = require("express");
const customerRoutes = require("./customer");
const healthRoutes = require("./health");
const loginRequired = require("../middleware/loginRequired");

const router = express.Router();

router.use("/:userId/customers", loginRequired, (req, res, next) => {
    req.userId = req.params.userId;
    next();
}, customerRoutes);
router.use("/", healthRoutes);

module.exports = router;