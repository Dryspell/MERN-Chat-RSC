const expresss = require("express");
const { registerUser, authUser } = require("../controllers/userControllers");
const router = expresss.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;
