const express = require("express");
const customerRoutes = require("./customerRoutes");
const healthRoutes = require("./healthRoutes");
const loginRequired = require("../middleware/loginRequired");

const router = express.Router();

router.use("/:userId/customers", loginRequired, (req, _res, next) => {
    req.userId = req.params.userId;
    next();
}, customerRoutes);
router.use("/", healthRoutes);

module.exports = router;