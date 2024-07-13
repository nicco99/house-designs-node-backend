import { findAll, findOne,createFeature, updateFeature,destroyFeature } from '../model/features.js'; 

export async function list(req, res, next) {
    //get a list of all Categories
    return await findAll(req, res, next)
}
// list,create,read,destroy,update
export async function read(req, res, next) { 
    // Get a single category by its ID
    return await findOne(req, res, next)
}

export async function create(req, res, next) {
    // create a new category
    return await createFeature(req, res, next)
}

export async function update(req, res, next) {
      //update a category by its ID Number
    return await updateFeature(req, res, next)
}
export async function destroy(req, res, next) {
    // Delete a category by its ID
    return await destroyFeature(req, res, next)
}

