const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
function list() {
  return knex("images").select("*");
}

function create(image){
  image.forEach(element => {
    return knex("images").insert(element).returning("*").then((createdRecords) => createdRecords[0]);
  });
 
}

// function listOutOfStockCount() {
//   return knex("products")
//     .select("product_quantity_in_stock as out_of_stock")
//     .count("product_id")
//     .where({ product_quantity_in_stock: 0 })
//     .groupBy("out_of_stock");
// }

// function update(updatedProduct){
//   return knex("products").where({product_id: updatedProduct.product_id}).update(updatedProduct,"*")
// }

// function listTotalWeightByProduct() {
//   return knex("products")
//     .select(
//       "product_sku",
//       "product_title",
//       knex.raw(
//         "sum(product_weight_in_lbs * product_quantity_in_stock) as total_weight_in_lbs"
//       )
//     )
//     .groupBy("product_title", "product_sku");
// }

// function destroy(productId) {
//   return knex("products").where({product_id: productId}).del()
// }

// const addCategory = mapProperties({
//       category_id: "category.category_id",
//       category_name: "category.category_name",
//       category_description: "category.category_description",
//     });
function read(imageId) {
  return knex("images").select("*").where({ image_id: imageId }).first();
}

// function listPriceSummary() {
//   return knex("products")
//     .select("supplier_id")
//     .min("product_price")
//     .max("product_price")
//     .avg("product_price")
//     .groupBy("supplier_id");
// }

module.exports = {
  list,
  read,
  // update,
  create,
  // destroy,
  // listOutOfStockCount,
  // listPriceSummary,
  // listTotalWeightByProduct
};
