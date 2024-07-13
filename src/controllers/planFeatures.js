import { createPlanFeatures, findAll,findOne, updatePlanFeatures,deletePlanFeatures } from '../model/planFeatures.js'; 

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
    return await createPlanFeatures(req, res, next)
}

export async function update(req, res, next) {
      //update a category by its ID Number
    return await updatePlanFeatures(req, res, next)
}
export async function destroy(req, res, next) {
    // Delete a category by its ID
    return await deletePlanFeatures(req, res, next)
}

