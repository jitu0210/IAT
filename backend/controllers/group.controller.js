const Group = require('../models/Group');

// Get all groups with average ratings
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().sort({ averageRating: -1 });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Other existing group controller methods...