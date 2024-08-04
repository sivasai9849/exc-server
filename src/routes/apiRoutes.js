const express = require("express");
const customerRoutes = require("./customerRoutes");
const workRoutes = require("./workRoutes");
const healthRoutes = require("./healthRoutes");
const loginRequired = require("../middleware/loginRequired");

const router = express.Router();

router.use("/", healthRoutes);
router.use("/:userId/customers", loginRequired, (req, _res, next) => {
    req.userId = req.params.userId;
    next();
}, customerRoutes);
router.use("/:userId/works", loginRequired, (req, _res, next) => {
    req.userId = req.params.userId;
    next();
}
, workRoutes);

module.exports = router;