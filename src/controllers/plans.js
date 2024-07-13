import { createPlan, findAll,findOne, deletePlan,updatePlan } from '../model/plans.js'; 

export async function list(req, res, next) {
    //get a list of all plans
    return await findAll(req, res, next)
}

export async function read(req, res, next) { 
    // Get a single plan by its ID
    return await findOne(req, res, next)
}

export async function create(req, res, next) {
    // create a new plan
    return await createPlan(req, res, next)
}

export async function update(req, res, next) {
      //update a plan by its ID Number
    return await updatePlan(req, res, next)
}
export async function destroy(req, res, next) {
    // Delete a plan by its ID
    return await deletePlan(req, res, next)
}

