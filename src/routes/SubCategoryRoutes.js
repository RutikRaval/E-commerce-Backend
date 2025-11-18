
const express = require('express');
const SubCategoryController = require('../controller/SubCategoryController');
const { validateSchema } = require('../middleware/Validate');
const SubCategoryValidation = require('../auth/SubCategoryValidation');

const subCategoryRouter = express.Router()
subCategoryRouter.use(express.json())

subCategoryRouter.get('/', SubCategoryController.getAllSubCategoryController);


subCategoryRouter.post('/',
    validateSchema(SubCategoryValidation.addSubCategoryValidation),
    SubCategoryController.addSubCategoryController
);



subCategoryRouter.delete('/:id', SubCategoryController.deleteSubCategoryController);



module.exports = subCategoryRouter
