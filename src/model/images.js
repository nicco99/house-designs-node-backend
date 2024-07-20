import db from "../db/dbConnection.js";

// method to get all categories from the database ...
export const findAll = async (req, res, next) => {

        const q = `SELECT * FROM images`;
         db.query(q, (err,data) => {
            if (err) {
                res.status(500).json({ error: `Server error: ${error.message}` });
            }
            res.status(200).json({ images: data });
         })
   
};

//method to get a single category from the database::::::
export const findOne = async (req, res, next) => {

    const { imageId } = req.params; 

    const q = `SELECT * FROM images WHERE id = ?`;
    db.query(q,[imageId],(err,data) => {
        if (err) {
            res.status(500).json({ error: `Server error: ${err.message}` });
        }
        res.status(200).json({ image: data });
    })
};

// Method of Function to create a new category in the database::::::

export const createImage = async (image_path,plan_id,res) => {

    const q = `INSERT INTO images(image_path,plan_id) VALUES(?)`;
const values = [image_path,plan_id];
    try {
        console.log(values)
        const data = await new Promise((resolve, reject) => {
            db.query(q, [values], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });

        res.status(201).json({ image: data });
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err}` });
    }
};


//method to update a category provided its ID:::

export const updateImage = async (req, res, next) => {
    const { imageId } = req.params;  
    const { image_path,image_name, plan_id } = req.body;
    const q = `UPDATE images SET image_path = ?, image_name = ?, plan_id = ? WHERE id = ?`;
    const values = [image_path, image_name ,plan_id , imageId];

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
            res.status(404).json({ error: 'Image not found' });
        } else {
            res.status(200).json({ message: 'Image updated successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};

//method to delete a category provided its ID:::
export const deleteImage = async (req, res, next) => {
    const { imageId } = req.params; // Assuming the category ID is passed as a URL parameter
    const q = `DELETE FROM images WHERE id = ?`;

    try {
        const data = await new Promise((resolve, reject) => {
            db.query(q, [imageId], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });

        if (data.affectedRows === 0) {
            res.status(404).json({ error: 'Image not found' });
        } else {
            res.status(200).json({ message: 'Image deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err.message}` });
    }
};

