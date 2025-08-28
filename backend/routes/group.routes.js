import groupController from "../controllers/group.controller.js"
import router from "express"
import protect from './../middleware/authMiddleware.js';

// All routes are protected
router.use(protect);

// Get all groups
router.get('/', groupController.getAllGroups);

// Get specific group
router.get('/:groupId', groupController.getGroup);

// Join a group
router.post('/:groupId/join', groupController.joinGroup);

// Leave a group
router.post('/:groupId/leave', groupController.leaveGroup);

// Rate a group
router.post('/:groupId/rate', groupController.rateGroup);

// Remove rating
router.delete('/:groupId/rating', groupController.removeRating);

// Initialize groups (admin only)
router.post('/initialize', groupController.initializeGroups);

export default router