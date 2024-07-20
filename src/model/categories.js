import db from "../db/dbConnection.js";

// method to get all categories from the database ...
export const findAll = async (req, res, next) => {

        const q = `SELECT * FROM categories`;
         db.query(q, (err,data) => {
            if (err) {
                res.status(500).json({ error: `Server error: ${error.message}` });
            }
            res.status(200).json({ categories: data });
         })
   
};

//method to get a single category from the database::::::
export const findOne = async (req, res, next) => {

    const { categoryId } = req.params; 

    const q = `SELECT * FROM categories WHERE id = ?`;
    db.query(q,[categoryId],(err,data) => {
        if (err) {
            res.status(500).json({ error: `Server error: ${err.message}` });
        }
        res.status(200).json({ category: data[0] });
    })
};

// Method of Function to create a new category in the database::::::

export const createCategory = async (req, res, next) => {
    const { name, description } = req.body;
    const q = `INSERT INTO categories(name, description) VALUES(?)`;
const values = [name, description];
    try {
        const data = await new Promise((resolve, reject) => {
            db.query(q, [values], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });

        res.status(201).json({ category: data });
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err}` });
    }
};


//method to update a category provided its ID:::

export const updateCategory = async (req, res, next) => {
    const { categoryId } = req.params;  
    const { name, description } = req.body;
    const q = `UPDATE categories SET name = ?, description = ? WHERE id = ?`;
    const values = [name, description, categoryId];

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
            res.status(404).json({ error: 'Category not found' });
        } else {
            res.status(200).json({ message: 'Category updated successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};

//method to delete a category provided its ID:::
export const deleteCategory = async (req, res, next) => {
    const { categoryId } = req.params; // Assuming the category ID is passed as a URL parameter
    const q = `DELETE FROM categories WHERE id = ?`;

    try {
        const data = await new Promise((resolve, reject) => {
            db.query(q, [categoryId], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });

        if (data.affectedRows === 0) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            res.status(200).json({ message: 'Category deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};

