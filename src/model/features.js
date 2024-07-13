import db from "../db/dbConnection.js";

// method to get all categories from the database ...
export const findAll = async (req, res, next) => {

        const q = `SELECT * FROM features`;
         db.query(q, (err,data) => {
            if (err) {
                res.status(500).json({ error: `Server error: ${error.message}` });
            }
            res.status(200).json({ features: data });
         })
   
};

//method to get a single category from the database::::::
export const findOne = async (req, res, next) => {
    const { planId } = req.params;

    const q = `
        SELECT 
            p.*, 
        f.feature_id
        FROM plans p
        LEFT JOIN planfeatures f ON p.id = f.plan_id
        WHERE f.plan_id = ?
        GROUP BY p.id
    `;

    db.query(q, [planId], (err, data) => {
        if (err) {
            res.status(500).json({ error: `Server error: ${err.message}` });
        } else if (data.length === 0) {
            res.status(404).json({ error: 'Plan not found' });
        } else {
            res.status(200).json({ plan: data[0] });
        }
    });
};

// Method of Function to create a new category in the database::::::

export const createFeature = async (req, res, next) => {
    const { description } = req.body;
    const q = `INSERT INTO features (description) VALUES(?)`;
const values = [description];
    try {
        const data = await new Promise((resolve, reject) => {
            db.query(q, [values], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });

        res.status(201).json({ feature: data });
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err}` });
    }
};


//method to update a category provided its ID:::

export const updateFeature = async (req, res, next) => {
    const { featureId } = req.params;  
    const { description } = req.body;
    const q = `UPDATE features SET description = ? WHERE id = ?`;
    const values = [description, featureId];

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
            res.status(404).json({ error: 'Feature not found' });
        } else {
            res.status(200).json({ message: 'Feature updated successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};

//method to delete a category provided its ID:::
export const destroyFeature = async (req, res, next) => {
    const { featureId } = req.params; // Assuming the category ID is passed as a URL parameter
    const q = `DELETE FROM features WHERE id = ?`;

    try {
        const data = await new Promise((resolve, reject) => {
            db.query(q, [featureId], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });

        if (data.affectedRows === 0) {
            res.status(404).json({ error: 'Feature not found' });
        } else {
            res.status(200).json({ message: 'Feature deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};

