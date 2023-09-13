const imagesService = require("./images.service");
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

// async function listTotalWeightByProduct(req, res) {
//   res.json({ data: await productsService.listTotalWeightByProduct() });
// }

function read(req, res, next) {
  const { image } = res.locals;
  res.json({ data: image });
}

async function create(req, res) {
  const images = await imagesService.create(req.body);
  res.status(201).json({ images });
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
