import db from "../db/dbConnection.js";

// method to get all categories from the database ...
export const findAll = async (req, res, next) => {
    const q = `SELECT * FROM categories`;

    try {
        // Fetch all records
        const categories = await new Promise((resolve, reject) => {
            db.all(q, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });

        res.status(200).json({ categories });
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};


//method to get a single category from the database::::::
export const findOne = async (req, res, next) => {
    const { categoryId } = req.params;

    const q = `SELECT * FROM categories WHERE id = ?`;

    try {
        // Fetch a single record
        const category = await new Promise((resolve, reject) => {
            db.get(q, [categoryId], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });

        if (category) {
            res.status(200).json({ category });
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};


// Method of Function to create a new category in the database::::::

export const createCategory = async (req, res, next) => {
    const { name, description } = req.body;
    const q = `INSERT INTO categories(name, description) VALUES(?, ?)`;
    const values = [name, description];

    try {
        const data = await new Promise((resolve, reject) => {
            db.run(q, values, function (err) {
                if (err) {
                    reject(err);
                }
                // Return the last inserted row ID and the values
                resolve({ id: this.lastID, name, description });
            });
        });

        res.status(201).json({ category: data });
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};



//method to update a category provided its ID:::

export const updateCategory = async (req, res, next) => {
    const { categoryId } = req.params;
    const { name, description } = req.body;
    if (!categoryId || !name || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const q = `UPDATE categories SET name = ?, description = ? WHERE id = ?`;
    const values = [name, description, categoryId];

    try {
        // Execute the update query
        const result = await new Promise((resolve, reject) => {
            db.run(q, values, function (err) {
                if (err) {
                    reject(err);
                }
                resolve(this.changes); // `this.changes` contains the number of rows affected
            });
        });

        if (result === 0) {
            // No rows updated, likely because the categoryId was not found
            res.status(404).json({ error: 'Category not found' });
        } else {
            // Update successful
            res.status(200).json({ message: 'Category updated successfully', updatedRows: result });
        }
    } catch (err) {
        // Log the error and return a 500 status
        console.error(err); // Logging the error for debugging
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};



//method to delete a category provided its ID:::
export const deleteCategory = async (req, res, next) => {
    const { categoryId } = req.params; // Assuming the category ID is passed as a URL parameter

    // Validate input
    if (!categoryId) {
        return res.status(400).json({ error: 'Category ID is required' });
    }

    const q = `DELETE FROM categories WHERE id = ?`;

    try {
        // Execute the delete query
        const result = await new Promise((resolve, reject) => {
            db.run(q, [categoryId], function (err) {
                if (err) {
                    reject(err);
                }
                resolve(this.changes); // `this.changes` contains the number of rows affected
            });
        });

        if (result === 0) {
            // No rows deleted, likely because the categoryId was not found
            res.status(404).json({ error: 'Category not found' });
        } else {
            // Deletion successful
            res.status(200).json({ message: 'Category deleted successfully' });
        }
    } catch (err) {
        // Log the error and return a 500 status
        console.error(err); // Logging the error for debugging
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};


