import db from "../db/dbConnection.js";

// Method to get all images from the database
export const findAll = (req, res, next) => {
  const q = `SELECT * FROM images`;

  db.all(q, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: `Server error: ${err.message}` });
    }
    res.status(200).json({ images: rows });
  });
};


//method to get a single category from the database::::::
export const findOne = (req, res, next) => {
    const { imageId } = req.params;
  
    const q = `SELECT * FROM images WHERE id = ?`;
  
    db.get(q, [imageId], (err, row) => {
      if (err) {
        return res.status(500).json({ error: `Server error: ${err.message}` });
      }
      if (!row) {
        return res.status(404).json({ error: 'Image not found' });
      }
      res.status(200).json({ image: row });
    });
  };
  

// Method of Function to create a new category in the database::::::

export const createImage = async (image_path, plan_id,name, res) => {
    const q = `INSERT INTO images (image_path, plan_id,image_name) VALUES (?, ?, ?)`;
    const values = [image_path, plan_id,name];
  
    try {
      const result = await new Promise((resolve, reject) => {
        db.run(q, values, function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ id: this.lastID });
        });
      });
  
      res.status(201).json({ image: result });
    } catch (err) {
      res.status(500).json({ error: `Server error: ${err.message}` });
    }
  };
  


//method to update a category provided its ID:::

export const updateImage = async (req, res, next) => {
    const { imageId } = req.params;
    const { image_path, image_name, plan_id } = req.body;
  
    const q = `UPDATE images SET image_path = ?, image_name = ?, plan_id = ? WHERE id = ?`;
    const values = [image_path, image_name, plan_id, imageId];
  
    try {
      const result = await new Promise((resolve, reject) => {
        db.run(q, values, function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ changes: this.changes });
        });
      });
  
      if (result.changes === 0) {
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
    const { imageId } = req.params;
  
    const q = `DELETE FROM images WHERE id = ?`;
  
    try {
      const result = await new Promise((resolve, reject) => {
        db.run(q, [imageId], function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ changes: this.changes });
        });
      });
  
      if (result.changes === 0) {
        res.status(404).json({ error: 'Image not found' });
      } else {
        res.status(200).json({ message: 'Image deleted successfully' });
      }
    } catch (err) {
      res.status(500).json({ error: `Server error: ${err.message}` });
    }
  };
  

