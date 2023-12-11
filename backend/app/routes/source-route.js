import express from "express";
import * as sourceController from '../controllers/source-controller.js';

const router = express.Router();

// POST: Create a new source
router.post('/', sourceController.addSource);

// GET: Get all sources for a specific user by their ID
router.get('/:userId', sourceController.getSourcesByUser);

// PUT: Update a source by its ID
router.put('/:sourceId', sourceController.updateSource);

// DELETE: Delete a source by its ID
router.delete('/:sourceId', sourceController.deleteSource);

export default router;
