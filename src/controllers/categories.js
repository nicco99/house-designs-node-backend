import { createCategory, findAll,findOne, updateCategory,deleteCategory } from '../model/categories.js'; 

export async function list(req, res, next) {
    //get a list of all Categories
    return await findAll(req, res, next)
}

export async function read(req, res, next) { 
    // Get a single category by its ID
    return await findOne(req, res, next)
}

export async function create(req, res, next) {
    // create a new category
    return await createCategory(req, res, next)
}

export async function update(req, res, next) {
      //update a category by its ID Number
    return await updateCategory(req, res, next)
}
export async function destroy(req, res, next) {
    // Delete a category by its ID
    return await deleteCategory(req, res, next)
}

