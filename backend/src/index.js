import dotenv from 'dotenv';
import { connectDB } from './db/db.connection.js';
import { app } from './app.js';
import { createAdmin } from './admin/create/admin.script.js';

dotenv.config({
    path: './.env'
})


// createAdmin()
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8080, () => {
            console.log(`Server is running on ${process.env.PORT || 8080}`);
        });
    })
    .catch((error) => {
        console.error("Error starting the server:", error);
    });