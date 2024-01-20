const designsService = require("./designs.service");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("image1", "image2");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function designExists(req, res, next) {
  const design = await designsService.read(req.params.designId);
  console.log(design);
  if (design) {
    res.locals.design = design;
    return next();
  }
  next({ status: 404, message: `Design cannot be found.` });
}

// async function listTotalWeightByProduct(req, res) {
//   res.json({ data: await productsService.listTotalWeightByProduct() });
// }

function read(req, res, next) {
  const { design } = res.locals;
  res.json({ design: design });
}

async function create(req, res) {
  const design = await designsService.create(req.body);
  res.status(201).json({ design });
}

async function destroy(req, res) {
  await designsService.destroy(res.locals.design.design_id);
  res.sendStatus(204);
}

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
  const data = await designsService.list();
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(designExists), read],
  list: [asyncErrorBoundary(list)],
  destroy: [asyncErrorBoundary(designExists), asyncErrorBoundary(destroy)],
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
