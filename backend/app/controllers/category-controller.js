import categoryService from '../services/category-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

export const createCategory = async (request, response) => {
    try {
        const newCategory = { ...request.body };
        const category = await categoryService.createCategory(newCategory);        
        setResponse(category, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

export const getCategoryByUser = async (request, response) => {
    try {
        const userId = request.params.userId;
        const categories = await categoryService.getCategoryByUser(userId);
        //const categories = await categoryService.findById(userId);
        setResponse(categories, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

export const updateCategory = async (request, response) => {
    try {
        const categoryId = request.params.categoryId;
        const updatedCategoryData = { ...request.body };
        const updatedCategory = await categoryService.updateCategory(categoryId, updatedCategoryData);
        setResponse(updatedCategory, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

export const deleteCategory = async (request, response) => {
    try {
        const categoryId = request.params.categoryId;
        await categoryService.deleteCategory(categoryId);
        setResponse({ message: 'Category successfully deleted' }, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};
