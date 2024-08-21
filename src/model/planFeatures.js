import db from "../db/dbConnection.js";

// Method to get all plan features from the database
export const findAll = async (req, res, next) => {
    const q = `SELECT * FROM planfeatures`;
    db.all(q, [], (err, data) => {
        if (err) {
            res.status(500).json({ error: `Server error: ${err.message}` });
        } else {
            res.status(200).json({ planFeatures: data });
        }
    });
};

// Method to get a single plan feature by its ID
export const findOne = async (req, res, next) => {
    const { planFeaturesId } = req.params;
    const q = `SELECT * FROM planfeatures WHERE plan_id = ?`;

    db.get(q, [planFeaturesId], (err, data) => {
        if (err) {
            res.status(500).json({ error: `Server error: ${err.message}` });
        } else if (!data) {
            res.status(404).json({ error: 'Plan feature not found' });
        } else {
            res.status(200).json({ planFeature: data });
        }
    });
};

// Method to create a new plan feature in the database
export const createPlanFeatures = async (req, res, next) => {
    const { planId, featureId } = req.body;
    const q = `INSERT INTO planfeatures (plan_id, feature_id) VALUES (?, ?)`;

    try {
        const result = await new Promise((resolve, reject) => {
            db.run(q, [planId, featureId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            });
        });

        res.status(201).json({ planFeature: result });
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};

// Method to update a plan feature by its ID
export const updatePlanFeatures = async (req, res, next) => {
    const { planFeaturesId } = req.params;
    const { planId, featureId } = req.body;
    const q = `UPDATE planfeatures SET plan_id = ?, feature_id = ? WHERE plan_id = ?`;
    const values = [planId, featureId, planFeaturesId];

    try {
        const result = await new Promise((resolve, reject) => {
            db.run(q, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes === 0) {
            res.status(404).json({ error: 'Plan feature not found' });
        } else {
            res.status(200).json({ message: 'Plan feature updated successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};

// Method to delete a plan feature by its ID
export const deletePlanFeatures = async (req, res, next) => {
    const { planFeaturesId } = req.params;
    const q = `DELETE FROM planfeatures WHERE plan_id = ?`;

    try {
        const result = await new Promise((resolve, reject) => {
            db.run(q, [planFeaturesId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes === 0) {
            res.status(404).json({ error: 'Plan feature not found' });
        } else {
            res.status(200).json({ message: 'Plan feature deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};
