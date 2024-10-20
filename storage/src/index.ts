import express, { type Request, type Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();

// Set up storage using multer
// const storage = multer.diskStorage({
//     destination: (req , _, cb) => {
//         const folderPath = path.join(__dirname, 'uploads', req.body.folderPath || '');

//         fs.mkdirSync(folderPath, { recursive: true }); // Create folder if it doesn't exist

//         cb(null, folderPath);
//     },
//     filename: (_ , file, cb) => {
//         cb(null, file.originalname); // Use original file name
//     }
// });

const upload = multer({ dest: 'uploads/' });

// Route to handle file upload
app.post('/upload', upload.single('file'), (req: Request, res: Response): void => {
    if (!req.file) {
        res.status(400).send('No file uploaded');
        return;
    }

    const filePath = path.join(__dirname, 'uploads', req.body.folderPath || '', req.file.originalname);
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
        res.status(400).send('File already exists');
        return;
    }

    res.send('File uploaded successfully!');
});

// Serve static files
app.use('/files', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
