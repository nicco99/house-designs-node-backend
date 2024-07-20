import { createImage, findAll,findOne, updateImage,deleteImage } from '../model/images.js'; 

export async function list(req, res, next) {
    //get a list of all Categories
    return await findAll(req, res, next)
}

export async function read(req, res, next) { 
    // Get a single category by its ID
    return await findOne(req, res, next)
}

export async function create(image_path,plan_id,res) {
    // create a new imAGE
    createImage(image_path,plan_id,res)
}

export async function update(req, res, next) {
      //update a category by its ID Number
    return await updateImage(req, res, next)
}
export async function destroy(req, res, next) {
    // Delete a category by its ID
    return await deleteImage(req, res, next)
}

