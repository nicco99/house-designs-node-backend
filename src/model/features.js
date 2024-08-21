import db from "../db/dbConnection.js";

// Method to get all categories (features) from the database
export const findAll = async (req, res, next) => {
    const q = `SELECT * FROM features`;
    db.all(q, [], (err, data) => {
        if (err) {
            res.status(500).json({ error: `Server error: ${err.message}` });
        } else {
            res.status(200).json({ features: data });
        }
    });
};

// Method to get a single category (plan) by plan ID
export const findOne = async (req, res, next) => {
    const { featureId } = req.params;
    const q = `
        SELECT * FROM features WHERE id = ?`;
    db.get(q, [featureId], (err, data) => {
        if (err) {
            res.status(500).json({ error: `Server error: ${err.message}` });
        } else if (!data) {
            res.status(404).json({ error: 'Feature not found' });
        } else {
            res.status(200).json({ plan: data });
        }
    });
};

// Method to create a new feature in the database
export const createFeature = async (req, res, next) => {
    const { description } = req.body;
    const q = `INSERT INTO features (description) VALUES (?)`;

    try {
        const result = await new Promise((resolve, reject) => {
            db.run(q, [description], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            });
        });

        res.status(201).json({ feature: result });
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};

// Method to update a feature by ID
export const updateFeature = async (req, res, next) => {
    const { featureId } = req.params;
    const { description } = req.body;
    const q = `UPDATE features SET description = ? WHERE id = ?`;

    try {
        const result = await new Promise((resolve, reject) => {
            db.run(q, [description, featureId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes === 0) {
            res.status(404).json({ error: 'Feature not found' });
        } else {
            res.status(200).json({ message: 'Feature updated successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};

// Method to delete a feature by ID
export const destroyFeature = async (req, res, next) => {
    const { featureId } = req.params;
    const q = `DELETE FROM features WHERE id = ?`;

    try {
        const result = await new Promise((resolve, reject) => {
            db.run(q, [featureId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });

        if (result.changes === 0) {
            res.status(404).json({ error: 'Feature not found' });
        } else {
            res.status(200).json({ message: 'Feature deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};
