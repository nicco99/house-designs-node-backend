import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors"
import morgan from "morgan"
import categories from "./routes/categories.js"
import plans from "./routes/plans.js"
import features from "./routes/features.js"
import { create } from './controllers/images.js';
import planFeatures from "./routes/planFeatures.js"
import images from "./routes/images.js"
const app = express();
dotenv.config();

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '251mb'}));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//multer js
// Resolve __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set storage engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limit file size to 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myImage');

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Upload route
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      if (req.file == undefined) {
        res.status(400).json({ error: 'No file selected' });
      } else {
        create(`uploads/${req.file.filename}`,req.body.plan_id,res)
      }
    }
  });
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//multer js
// Routes
app.use("/plans", plans);
app.use("/categories", categories);
app.use('/features', features);
app.use('/plan-features', planFeatures)
app.use('/images', images);
//Missed route

app.use((req, res, next) => {
  next({ status: 404, message: `Route ${req.originalUrl} is not defined` });
});

app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});
export default app;
