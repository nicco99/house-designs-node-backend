import db from "../db/dbConnection.js";

// method to get all plans from the database ...
export const findAll = async (req, res, next) => {
  const q = `SELECT  plans.*
             FROM plans 
             LEFT JOIN images 
             ON plans.id = images.plan_id;`;

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: `Server error: ${err.message}` });
    }

    const plansMap = new Map();

    data.forEach(row => {
      const planId = row.plan_id;

      if (!plansMap.has(planId)) {
        plansMap.set(planId, {
          ...row,
          images: []
        });
      }

      const plan = plansMap.get(planId);

      if (row.image_path) {
        plan.images.push({
          image_path: row.image_path,
        });
      }
    });

    const plans = Array.from(plansMap.values());

    res.status(200).json({ plans });
  });
};



//method to get a single plan from the database::::::
export const findOne = async (req, res, next) => {
  const { planId } = req.params;

  const q = `
    SELECT 
      plans.id AS plan_id,
      plans.plan_size,
      plans.plan_name,
      plans.no_of_bedrooms,
      plans.no_of_bathrooms,
      plans.category_id,
      plans.price_per_sqm,
      plans.price,
      plans.plinth_area,
      plans.floors,
      plans.plan_length,
      plans.plan_height,
      plans.description,
      images.id AS image_id,
      images.image_path,
      features.id AS feature_id,
      features.description AS feature_description
    FROM 
      plans
    LEFT JOIN 
      images ON plans.id = images.plan_id
    LEFT JOIN 
      planfeatures ON plans.id = planfeatures.plan_id
    LEFT JOIN 
      features ON planfeatures.feature_id = features.id
    WHERE 
      plans.id = ?
  `;

  db.query(q, [planId], (err, data) => {
    if (err) {
      return res.status(500).json({ error: `Server error: ${err.message}` });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    const planMap = new Map();

    data.forEach(row => {
      const planId = row.plan_id;

      if (!planMap.has(planId)) {
        planMap.set(planId, {
          id: row.plan_id,
          plan_size: row.plan_size,
          plan_name: row.plan_name,
          no_of_bedrooms: row.no_of_bedrooms,
          no_of_bathrooms: row.no_of_bathrooms,
          category_id: row.category_id,
          price_per_sqm: row.price_per_sqm,
          price: row.price,
          plinth_area: row.plinth_area,
          floors: row.floors,
          plan_length: row.plan_length,
          plan_height: row.plan_height,
          description: row.description,
          images: new Map(),
          features: new Map()
        });
      }

      const plan = planMap.get(planId);

      if (row.image_id && !plan.images.has(row.image_id)) {
        plan.images.set(row.image_id, {
          id: row.image_id,
          image_path: row.image_path
        });
      }

      if (row.feature_id && !plan.features.has(row.feature_id)) {
        plan.features.set(row.feature_id, {
          id: row.feature_id,
          description: row.feature_description
        });
      }
    });

    // Convert Maps to Arrays
    const [plan] = Array.from(planMap.values());
    plan.images = Array.from(plan.images.values());
    plan.features = Array.from(plan.features.values());

    res.status(200).json({ plan });
  });
};



  

// Method of Function to create a new plan in the database::::::

export const createPlan = async (req, res, next) => {
    const { plan_size,plan_name,no_of_bedrooms,no_of_bathrooms,category_id,price_per_sqm,price,plinth_area,floors, plan_height,plan_length,description } = req.body;

    const q = `INSERT INTO plans(plan_size,plan_name,no_of_bedrooms,no_of_bathrooms,category_id,price_per_sqm,price,plinth_area,floors, plan_height,plan_length,description) VALUES(?)`;
const values = [plan_size,plan_name,no_of_bedrooms,no_of_bathrooms,category_id,price_per_sqm,price,plinth_area,floors, plan_height,plan_length,description];
    try {
        const data = await new Promise((resolve, reject) => {
            db.query(q, [values], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });

        res.status(201).json({ plan: data });
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err}` });
    }
};


//method to update a plan provided its ID:::

export const updatePlan = async (req, res, next) => {
    const { planId } = req.params;  
    const { plan_size,plan_name,no_of_bedrooms,no_of_bathrooms,category_id,price_per_sqm,price,plinth_area,floors,plan_height,plan_length } = req.body;
    const q = `UPDATE categories SET plan_size = ?,plan_name = ?,no_of_bedrooms = ?,no_of_bathrooms = ?,category_id = ?,price_per_sqm = ?,price = ?,plinth_area = ?,floors = ?,plan_height = ? , plan_length = ? WHERE id = ?`;
    const values = [plan_size,plan_name,no_of_bedrooms,no_of_bathrooms,category_id,price_per_sqm,price,plinth_area,floors,plan_height,plan_length, planId];

    try {
        const data = await new Promise((resolve, reject) => {
            db.query(q, values, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });

        if (data.affectedRows === 0) {
            res.status(404).json({ error: 'Plan not found' });
        } else {
            res.status(200).json({ message: 'Plan updated successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};

//method to delete a plan provided its ID:::
export const deletePlan = async (req, res, next) => {
    const { planId } = req.params; 
    const q = `DELETE FROM plans WHERE id = ?`;

    try {
        const data = await new Promise((resolve, reject) => {
            db.query(q, [planId], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });

        if (data.affectedRows === 0) {
            res.status(404).json({ error: 'Plan not found' });
        } else {
            res.status(200).json({ message: 'Plan deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};

