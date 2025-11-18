
const express = require('express');
const CategoryValidation = require('../auth/CategoryValidation');
const CategoryController = require('../controller/CategoryController');
const { validateSchema } = require('../middleware/Validate');

const categoryRouter = express.Router()

categoryRouter.get('/', CategoryController.getAllCategoryController);

categoryRouter.get('/:id', CategoryController.getCategoryByIdController);

categoryRouter.post('/',
    validateSchema(CategoryValidation.addCategoryValidation),
    CategoryController.addCategoryController
);

categoryRouter.put('/:id',
    validateSchema(CategoryValidation.updateCategoryValidation),
    CategoryController.updateCategoryController
);

categoryRouter.delete('/:id', CategoryController.deleteCategoryController);

categoryRouter.patch('/:id/toggle', CategoryController.toggleCategoryController);


module.exports = categoryRouter
