const express = require("express");
const router = express.Router();
const healthController = require("../controllers/health");

router.get("/", healthController.getHealth);
router.post("/protected", healthController.protectedRoute);
router.post("/test_db", healthController.testDb);

module.exports = router;