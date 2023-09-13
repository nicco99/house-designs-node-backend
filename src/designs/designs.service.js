const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
function list() {
  return knex("designs")
    .select("designs.*", "images.src as imageSrc")
    .leftJoin("images", "designs.design_id", "images.design_id")
   
}

function create(design){
  return knex("designs").insert(design).returning("*").then((createdRecords) => createdRecords[0]);
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

function read(designId) {
  return knex("designs as d")
    .select("d.*", "i.image_id", "i.src", "f.feature_id", "f.name")
    .leftJoin("design_images as di", "d.design_id", "di.design_id")
    .leftJoin("images as i", "di.image_id", "i.image_id")
    .leftJoin("design_features as df", "d.design_id", "df.design_id")
    .leftJoin("features as f", "df.feature_id", "f.feature_id")
    .where({ "d.design_id": designId })
    .then((rows) => {
      if (rows.length === 0) {
        return null; // Handle the case where the design doesn't exist
      }

      const designData = {
        ...rows[0], // Copy design properties from the first row
        images: [],
        features: [],
      };

      // Group images and features by their respective IDs
      rows.forEach((row) => {
        if (row.image_id !== null && !designData.images.some((img) => img.image_id === row.image_id)) {
          designData.images.push({
            image_id: row.image_id,
            src: row.src,
            // Add other image properties as needed
          });
        }
        if (row.feature_id !== null && !designData.features.some((feature) => feature.feature_id === row.feature_id)) {
          designData.features.push({
            feature_id: row.feature_id,
            name: row.name,
            // Add other feature properties as needed
          });
        }
      });

      return designData;
    });
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
