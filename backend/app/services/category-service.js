import Category from '../models/category.js'

const categoryService = {
    createCategory: async (data) => {
        const newCategory = new Category(data);
        return await newCategory.save();
    },

    getCategoryByUser: async (userId) => {
        return await Category.find({ user: userId });
    },

    updateCategory: async (categoryId, updatedCategoryData) => {
        return await Category.findByIdAndUpdate(categoryId, updatedCategoryData).exec();
    },

    deleteCategory: async (categoryId) => {
        return await Category.findByIdAndDelete(categoryId);
    }
};

export default categoryService;