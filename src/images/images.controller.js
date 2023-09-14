const imagesService = require("./images.service");
const cloudinary = require("../utils/cloudinary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("image1", "image2");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
async function imageExists(req, res, next) {
  const image = await imagesService.read(req.params.imageId);
  if (image) {
    res.locals.image = image;
    return next();
  }
  next({ status: 404, message: `image cannot be found.` });
}

function read(req, res, next) {
  const { image } = res.locals;
  res.json({ data: image });
}

async function create(req, res) {
  const image = req.files.image;
  const { design_id } = req.body;
  try {
    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "designs",
    });

    const imageData = { src: result.secure_url, design_id: design_id };
    const savedImage = await imagesService.create(imageData);
    res.status(201).json({ savedImage });
  } catch (err) {
    console.log("Error", err);
    return res.status(400).json({ error: err });
  }
}
// async function destroy(req, res) {
//   await designsService.destroy(res.locals.design.design_id);
//   res.sendStatus(204);
// }

// async function listOutOfStockCount(req, res, next) {
//   res.json({ data: await designsService.listOutOfStockCount() });
// }
// async function listPriceSummary(req, res, next) {
//   res.json({ data: await designsService.listPriceSummary() });
// }

// async function update(req, res) {
//   const updatedProduct = {
//     ...req.body,
//     product_id: res.locals.product.product_id,
//   };
//   const product = await productsService.update(updatedProduct);
//   res.json({ data: product });
// }

async function list(req, res) {
  const data = await imagesService.list();
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(imageExists), read],
  list: [asyncErrorBoundary(list)],
  // destroy: [asyncErrorBoundary(productExists), asyncErrorBoundary(destroy)],
  // listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  create: [asyncErrorBoundary(create)],
  // update: [
  //   asyncErrorBoundary(productExists),
  //   hasOnlyValidProperties,
  //   hasRequiredProperties,
  //   asyncErrorBoundary(update),
  // ],
  // listPriceSummary: asyncErrorBoundary(listPriceSummary),
  // listTotalWeightByProduct: asyncErrorBoundary(listTotalWeightByProduct),
};
