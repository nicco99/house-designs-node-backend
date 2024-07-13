import db from "../db/dbConnection.js";

// method to get all categories from the database ...
export const findAll = async (req, res, next) => {

        const q = `SELECT * FROM planfeatures`;
         db.query(q, (err,data) => {
            if (err) {
                res.status(500).json({ error: `Server error: ${error.message}` });
            }
            res.status(200).json({ planFeatures: data });
         })
   
};

//method to get a single category from the database::::::
export const findOne = async (req, res, next) => {

    const { planFeaturesId } = req.params; 

    const q = `SELECT * FROM planfeatures WHERE id = ?`;
    db.query(q,[planFeaturesId],(err,data) => {
        if (err) {
            res.status(500).json({ error: `Server error: ${err.message}` });
        }
        res.status(200).json({ planFeature: data });
    })
};

// Method of Function to create a new category in the database::::::

export const createPlanFeatures = async (req, res, next) => {
    const { planId,featureId } = req.body;
    const q = `INSERT INTO planfeatures (plan_id,feature_id) VALUES(?)`;
const values = [planId,featureId];
    try {
        const data = await new Promise((resolve, reject) => {
            db.query(q, [values], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });

        res.status(201).json({ planFeature: data });
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err}` });
    }
};


//method to update a category provided its ID:::

export const updatePlanFeatures = async (req, res, next) => {
    const { planFeaturesId } = req.params;  
    const { planId, featureId } = req.body;

    
    const q = `UPDATE planfeatures SET plan_id = ?,feature_id = ? WHERE id = ?`;
    const values = [planId, featureId,planFeaturesId];

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
            res.status(404).json({ error: 'Plan feature not found' });
        } else {
            res.status(200).json({ message: 'Plan feature updated successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};

//method to delete a category provided its ID:::
export const deletePlanFeatures = async (req, res, next) => {
    const { planFeaturesId } = req.params; // Assuming the category ID is passed as a URL parameter
    const q = `DELETE FROM planfeatures WHERE id = ?`;

    try {
        const data = await new Promise((resolve, reject) => {
            db.query(q, [planFeaturesId], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });

        if (data.affectedRows === 0) {
            res.status(404).json({ error: 'Plan Features not found' });
        } else {
            res.status(200).json({ message: 'Plan Features deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};

