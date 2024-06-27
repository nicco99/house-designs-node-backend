const {db} = require("../db/dbConnection.js");

async function list() {
  const sql = `
    SELECT 
      Plan.*, 
      categories.name AS category_name, 
      Images.image_path,
      Features.description AS feature_description
    FROM 
      Plan
    LEFT JOIN 
      categories ON Plan.category_id = categories.id
    LEFT JOIN 
      Images ON Plan.id = Images.plan_id
    LEFT JOIN 
      PlanFeatures ON Plan.id = PlanFeatures.plan_id
    LEFT JOIN 
      Features ON PlanFeatures.feature_id = Features.id
    ORDER BY 
      Plan.id;
  `;
  
  return new Promise((resolve, reject) => {
    db.query(sql, (err, data) => {
      if (err) {
        return reject(err); // Reject the promise with the error
      }

      // Process the data to nest images and features
      const plans = {};
      data.forEach(row => {
        if (!plans[row.id]) {
          plans[row.id] = {
            id: row.id,
            county: row.county,
            location: row.location,
            plan_size: row.plan_size,
            plan_name: row.plan_name,
            no_of_bedrooms: row.no_of_bedrooms,
            no_of_bathrooms: row.no_of_bathrooms,
            class_of_finishes: row.class_of_finishes,
            contract_type: row.contract_type,
            price_per_sqm: row.price_per_sqm,
            price: row.price,
            plinth_area: row.plinth_area,
            floor: row.floor,
            description: row.description,
            category_name: row.category_name, // Category name
            images: [],
            features: []
          };
        }

        if (row.image_path) {
          plans[row.id].images.push(row.image_path);
        }

        if (row.feature_description) {
          plans[row.id].features.push(row.feature_description);
        }
      });

      resolve(Object.values(plans)); // Resolve the promise with the processed data
    });
  });
}


function read(planId) {
  const sql = `
    SELECT 
      Plan.*, 
      categories.name AS category_name, 
      Images.image_path,
      Features.description AS feature_description
    FROM 
      Plan
    LEFT JOIN 
      categories ON Plan.category_id = categories.id
    LEFT JOIN 
      Images ON Plan.id = Images.plan_id
    LEFT JOIN 
      PlanFeatures ON Plan.id = PlanFeatures.plan_id
    LEFT JOIN 
      Features ON PlanFeatures.feature_id = Features.id
    WHERE 
      Plan.id = ?
    ORDER BY 
      Plan.id;
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [planId], (err, data) => {
      if (err) {
        return reject(err); // Reject the promise with the error
      }

      if (data.length === 0) {
        return resolve(null); // Return null if no plan is found
      }

      // Process the data to nest images and features
      const plan = {
        id: data[0].id,
        county: data[0].county,
        location: data[0].location,
        plan_size: data[0].plan_size,
        plan_name: data[0].plan_name,
        no_of_bedrooms: data[0].no_of_bedrooms,
        no_of_bathrooms: data[0].no_of_bathrooms,
        class_of_finishes: data[0].class_of_finishes,
        contract_type: data[0].contract_type,
        price_per_sqm: data[0].price_per_sqm,
        price: data[0].price,
        plinth_area: data[0].plinth_area,
        floor: data[0].floor,
        description: data[0].description,
        category_name: data[0].category_name,
        images: [],
        features: []
      };

      data.forEach(row => {
        if (row.image_path && !plan.images.includes(row.image_path)) {
          plan.images.push(row.image_path);
        }

        if (row.feature_description && !plan.features.includes(row.feature_description)) {
          plan.features.push(row.feature_description);
        }
      });

      resolve(plan); // Resolve the promise with the processed data
    });
  });
}

function create(design) {
return "hekko !!"
}


function destroy(designId) {
  return "done"
}



module.exports = {
  list,
  read,
  
  create,
  destroy,

};
