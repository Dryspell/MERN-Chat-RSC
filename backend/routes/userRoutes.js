const expresss = require("express");
const { registerUser } = require("../controllers/userControllers");
const router = expresss.Router();

router.route("/").post(registerUser);
// router.post("/login", loginUser);

module.exports = router;
