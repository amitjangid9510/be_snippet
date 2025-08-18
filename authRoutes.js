const express = require("express");
const authController = require("../controllers/userAuthController");
const { authMiddleware } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

const router = express.Router();

// -------------------- Auth Routes --------------------

// Public
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/send-otp", authController.sendOtpForVerificationORLogin);
router.post("/verify-signup-otp", authController.verifyOtpForSignup);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// Protected
router.post("/logout", authMiddleware, authController.logout);
router.post("/change-password", authMiddleware, authController.changePassword);
router.get("/me", authMiddleware, authController.getCurrentUser);
router.delete("/delete-account", authMiddleware, authController.deleteAccount);

// -------------------- File Upload Routes --------------------

// Upload a single profile image (field name = "image")
router.post(
  "/upload-image",
  authMiddleware,
  upload.single("image"),
  authController.uploadSingleImage
);

// Upload multiple images (field name = "images")
router.post(
  "/upload-multiple-images",
  authMiddleware,
  upload.array("images", 5), // limit = 5 images
  authController.uploadMultipleImages
);

module.exports = router;
