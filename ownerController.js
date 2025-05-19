const express = require("express");
const router = express.Router();
const { authorizeRoles } = require("../middleware/auth");
const adminController = require("../controllers/adminController");

router.use(authorizeRoles("admin"));

// Dashboard data
router.get("/dashboard", adminController.getDashboardData);

// Add new store
router.post("/stores", adminController.addStore);

// Add new user (normal user or admin)
router.post("/users", adminController.addUser);

// Get list of stores with filters (name, email, address, rating)
router.get("/stores", adminController.listStores);

// Get list of users with filters (name, email, address, role)
router.get("/users", adminController.listUsers);

// Get user details by id
router.get("/users/:id", adminController.getUserDetails);

// Logout (optional if managed client-side, but we can keep for completeness)
router.post("/logout", (req, res) => {
  // Simply instruct client to delete token
  res.send("Logged out");
});