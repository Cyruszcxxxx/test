import express from "express";
import * as categoryController from '../controllers/category-controller.js';

const router = express.Router();

// create a new category
router.route('/')
  .post(categoryController.createCategory);

// get all category by user id
router.route('/:userId')
  .get(categoryController.getCategoryByUser);

// update and delete category by category Id
router.route('/:categoryId')
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default router;


