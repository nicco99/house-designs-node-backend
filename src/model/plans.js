import db from "../db/dbConnection.js";

// method to get all plans from the database ...
export const findAll = async (req, res, next) => {
  const q = `SELECT plans.id AS plan_id, plans.*, images.image_path
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
        plans.id, 
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
        images.id AS image_id, 
        images.image_path AS path,
        images.plan_id AS plan_id
      FROM 
        plans
      JOIN 
        planfeatures fp ON plans.id = fp.plan_id
      JOIN 
        features f ON fp.feature_id = f.id
      LEFT JOIN 
        images 
      ON 
        plans.id = images.plan_id
      WHERE 
        plans.id = ?
      GROUP BY
        plans.id,
        images.id,
        f.description,
        f.id
    `;

  
    db.query(q, [planId], (err, data) => {
      if (err) {
        return res.status(500).json({ error: `Server error: ${err.message}` });
      }
  
      if (data.length === 0) {
        return res.status(404).json({ error: 'Plan not found' });
      }
  
      const plan = {
        id: data[0].plan_id,
        plan_size: data[0].plan_size,
        plan_name: data[0].plan_name,
        no_of_bedrooms: data[0].no_of_bedrooms,
        no_of_bathrooms: data[0].no_of_bathrooms,
        category_id: data[0].category_id,
        contract_type: data[0].contract_type,
        price_per_sqm: data[0].price_per_sqm,
        price: data[0].price,
        plinth_area: data[0].plinth_area,
        floor: data[0].floor,
        description: data[0].description,
        images: data.filter(row => row.id !== null).map(row => ({
          id: row.image_id,
          image_path: row.path,
          plan_id: row.plan_id
        })),
        features: data.filter(row => row.id !== null).map(row => ({
            id: row.feature_id,
            description: row.features
          }))


      };
  
      res.status(200).json({ plan });
    });
  };
  

// Method of Function to create a new plan in the database::::::

export const createPlan = async (req, res, next) => {
    const { plan_size,plan_name,no_of_bedrooms,no_of_bathrooms,category_id,price_per_sqm,price,plinth_area,floors, plan_height,plan_length } = req.body;

    const q = `INSERT INTO plans(plan_size,plan_name,no_of_bedrooms,no_of_bathrooms,category_id,price_per_sqm,price,plinth_area,floors, plan_height,plan_length) VALUES(?)`;
const values = [plan_size,plan_name,no_of_bedrooms,no_of_bathrooms,category_id,price_per_sqm,price,plinth_area,floors, plan_height,plan_length];
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
    const { name, description } = req.body;
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

