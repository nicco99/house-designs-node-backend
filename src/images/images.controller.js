const imagesService = require("./images.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
async function imageExists(req, res, next) {
  
  next({ status: 404, message: `image cannot be found.` });
}

function read(req, res, next) {
return "Hello World!"
}

async function create(req, res) {
  try {
  
  } catch (err) {
   
    return "Hello World!"
  }
}


async function list(req, res) {
  const data = await imagesService.list();
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(imageExists), read],
  list: [asyncErrorBoundary(list)],

  create: [asyncErrorBoundary(create)],
 
};
